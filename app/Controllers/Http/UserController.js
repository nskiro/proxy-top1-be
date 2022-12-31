'use strict'
const { validate } = use('Validator')
const Database = use('Database')
const Logger = use('Logger')
const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
  async create({request, response}){
    try{
      //Rules xác thực dữ liệu
      const rules = {
        username: 'required|string|min:8|max:20',
        email: 'required|email',
        password: 'required|string'
      }
      //Xác thực dữ liệu
      const validation = await validate(request.all(), rules)
      // Trả về lỗi nếu xác thực fail
      if (validation.fails()) {
        throw {"name": "Validate", "message": validation.messages()[0].message}
      }

      //Đọc dữ liệu trong post request
      const postData = request.only(['username', 'email', 'password'])
      // Thêm user vào database
      const user = await User.create(postData)
      const {password, ...resUser} = user.toJSON()
        return response.status(200).json({
          status: 'success',
          result: resUser
        })
    }
    catch(err){
      Logger.error("UserController.create")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }

  async loginUser({request, response, auth}){
    try{
      //Rules xác thực dữ liệu
      const rules = {
        username: 'required|string|min:8|max:20',
        password: 'required|string'
      }
      //Xác thực dữ liệu
      const validation = await validate(request.all(), rules)
      // Trả về lỗi nếu xác thực fail
      if (validation.fails()) {
        throw {"name": "Validate", "message": validation.messages()[0].message}
      }
      //Đọc dữ liệu trong post request
      const postData = request.only(['username', 'password'])
      //Kiểm tra username có tồn tại?
      const getUser = await User.findBy('username', postData.username)
      if(getUser)
      {
        //Kiểm tra đúng mật khẩu?
        const checkPassword = await Hash.verify(postData.password, getUser.password)
        if(checkPassword){
          //Tạo jwt token & jwt refresh token
          const jwtResponse = await auth.withRefreshToken().attempt(postData.username, postData.password)
          return response.status(200).json({
            status: "success",
            result: jwtResponse
          })
        }
        else
        {
          throw {"name": "Lỗi truy vấn", "message": "Mật khẩu không chính xác"}
        }
      }
      else
      {
        throw {"name": "Lỗi truy vấn", "message": "Username không tồn tại"}
      }
    }
    catch(err){
      Logger.error("UserController.loginUser")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }

  async getInfo({response, auth}){
    try{
      await auth.check()
      const loggedUser = await auth.getUser()
      const {password, ...resUser} = loggedUser.toJSON()
      return response.status(200).json({
        status: "success",
        result: resUser
      })
    }
    catch(err)
    {
      Logger.error("UserController.getInfo")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }

  async logoutUser({request, response, auth}){
    try{
      //Rules xác thực dữ liệu
      const rules = {
        refreshToken: 'required|string'
      }
      //Xác thực dữ liệu
      const validation = await validate(request.all(), rules)
      // Trả về lỗi nếu xác thực fail
      if (validation.fails()) {
        throw {"name": "Validate", "message": validation.messages()[0].message}
      } 
      const refreshToken = request.only(['refreshToken'])
      await auth
            .authenticator('jwt')
            .revokeTokens([refreshToken], true)
      return response.status(200).json({
        status: 'success',
        result: null
      })
    }
    catch(err)
    {
      Logger.error("UserController.logoutUser")
      Logger.error(err.name + ": " + err.message)
      return response.status(400).json({
        status: "error",
        result: null
      })
    }
  }
}

module.exports = UserController
