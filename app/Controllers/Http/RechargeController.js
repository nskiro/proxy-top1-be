'use strict'
const Logger = use('Logger')
const QrCode = use('qrcode')
const BankAccount = use('App/Models/BankAccount')
const {crc16_ccitt} = require('../../../helpers/Crc16')

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
        result: qrImg
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

  async getBankAcc({request, response, auth}){
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
}

module.exports = RechargeController
