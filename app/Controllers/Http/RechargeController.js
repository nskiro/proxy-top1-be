'use strict'
const Logger = use('Logger')
const QrCode = use('qrcode')
const BankAccount = use('App/Models/BankAccount')
const User = use('App/Models/User')
const RechargeHistory = use('App/Models/RechargeHistory')
const {crc16_ccitt} = require('../../../helpers/Crc16')
const Redis = use('Redis')
const Ws = use('Ws')
class RechargeController {
  async getQRCode({request, response, auth}){
    try{
      await auth.check()
      const loggedUser = await auth.getUser()
      const {username} = loggedUser.toJSON()
      const memo = "TOP1 " + username
      const postData = request.only(['amount','id'])
      const bankAcc = await BankAccount.findOrFail(postData.id)
      const data38 = "0010A00000072701" + (14 + bankAcc.acc_number.length) + "0006"+ bankAcc.bin_id + "01" + bankAcc.acc_number.length.toString().padStart(2, '0') + bankAcc.acc_number + "0208QRIBFTTA"
      let qrstring = "00020101021238"+ data38.length + data38 +"5303704540" + postData.amount.toString().length + postData.amount
      qrstring += "5802VN62" + (memo.length + 4) + "08" + memo.length + memo + "6304"
      qrstring += crc16_ccitt(qrstring).toString(16).toUpperCase()
      const qrImg = await QrCode.toDataURL(qrstring)
      return response.status(200).json({
        status: "success",
        result: {
          qr: qrImg,
          acc_number: bankAcc.acc_number,
          accHolder: bankAcc.acc_name
        }
      })
    }
    catch(err)
    {
      Logger.error("RechargeController.getQRCode")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }

  async getBankAcc({response, auth}){
    try{
      await auth.check() 
      const bankAcc = await BankAccount.query().setVisible(['id', 'bank_name']).fetch()
      return response.status(200).json({
        status: "success",
        result: bankAcc
      })
    }
    catch(err){
      Logger.error("RechargeController.getBankAcc")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }

  async received({request, response}){
    try{
      Logger.info(request.raw())
      const postData = JSON.parse(request.raw())
      if(postData.hasOwnProperty("memo")){
        const regex = /\VCB\s(.+?)\s+(.+?)\sVND(?:.*)TOP1\s(.+?)$/gm;
        let regMatch = regex.exec(postData.memo)
        if(regMatch.length == 4){
          const amount = parseInt(regMatch[2].replace(",",""))
          //Get bank account id
          const bankAcc = await BankAccount.findByOrFail('acc_number', regMatch[1])
          //Update account balance by username
          const user = await User.findByOrFail('username', regMatch[3])
          user.balance = user.balance + amount
          await user.save()
          //Update recharge history
          const recHis = new RechargeHistory()
          recHis.user_id = user.id
          recHis.bank_acc_id = bankAcc.id
          recHis.recharge_amount = amount
          await recHis.save()
          const userSocketId = await Redis.get(user.username)
          if(userSocketId)
          {
            Logger.info(userSocketId)
            const topic = Ws.getChannel('recharge').topic('recharge')
            if(topic){
              topic.emitTo('recharge_amount', amount, [userSocketId])
            }
          }
          return response.status(200).json({
            status: "success",
            result: {
              user: regMatch[3],
              recharge_amount: amount
            }
          })
        }
      }
      else{
        throw {"name": "Invalid POST data", "message": "POST data has not memo property"}
      }
    }
    catch(err){
      Logger.error("RechargeController.received")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }
}

module.exports = RechargeController
