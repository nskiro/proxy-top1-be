'use strict'
const { validate } = use('Validator')
const Logger = use('Logger')
const ForwardHost = use('App/Models/ForwardHost')

class ForwardHostController {
  async create({request, response}){
    try{
      //Rules xác thực dữ liệu
      const rules = {
        host_name: 'required|string|max:255',
        ip_address: 'required|max:15',
        username: 'required|string|max:10',
        password: 'required|string|max:10',
        vps_provider: 'required|string|max:255'
      }
      //Xác thực dữ liệu
      const validation = await validate(request.all(), rules)
      // Trả về lỗi nếu xác thực fail
      if (validation.fails()) {
        throw {"name": "Data validation fail", "message": validation.messages()[0].message}
      }
      //Đọc dữ liệu trong post request
      const postData = request.all()
      // Thêm Forward Host vào database
      const forwardHost = await ForwardHost.create(postData)
      return response.status(200).json({
        status: 'success',
        result: forwardHost.toJSON()
      })
    }
    catch(err){
      Logger.error("ForwardHostController.create")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }
  
  async getForwardHost({response}){
    try{
      const forwardHosts = await ForwardHost.query().fetch()
      return response.status(200).json({
        status: "success",
        result: forwardHosts
      })
    }
    catch(err){
      Logger.error("RechargeController.getForwardHost")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }
}

module.exports = ForwardHostController
