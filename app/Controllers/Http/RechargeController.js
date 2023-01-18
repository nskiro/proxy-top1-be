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
      const data38 = "0010A00000072701" + (14 + bankAcc.accNumber.length) + "0006"+ bankAcc.binID + "01" + bankAcc.accNumber.length.toString().padStart(2, '0') + bankAcc.accNumber + "0208QRIBFTTA"
      let qrstring = "00020101021238"+ data38.length + data38 +"5303704540" + postData.amount.toString().length + postData.amount
      qrstring += "5802VN62" + (memo.length + 4) + "08" + memo.length + memo + "6304"
      qrstring += crc16_ccitt(qrstring).toString(16).toUpperCase()
      const qrImg = await QrCode.toDataURL(qrstring)
      return response.status(200).json({
        status: "success",
        result: {
          qr: qrImg,
          accNumber: bankAcc.accNumber,
          accHolder: bankAcc.accName
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
      const bankAcc = await BankAccount.query().setVisible(['id', 'bankName']).fetch()
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
          const bankAcc = await BankAccount.findByOrFail('accNumber', regMatch[1])
          //Update account balance by username
          const user = await User.findByOrFail('username', regMatch[3])
          user.balance = user.balance + amount
          await user.save()
          //Update recharge history
          const recHis = new RechargeHistory()
          recHis.user_id = user.id
          recHis.bank_acc_id = bankAcc.id
          recHis.rechargeAmount = amount
          await recHis.save()
          const userSocketId = await Redis.get(user.username)
          if(userSocketId)
          {
            Logger.info(userSocketId)
            const topic = Ws.getChannel('recharge').topic('recharge')
            if(topic){
              topic.emitTo('rechargeAmount', amount, [userSocketId])
            }
          }
          return response.status(200).json({
            status: "success",
            result: {
              user: regMatch[3],
              rechargeAmount: amount
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
