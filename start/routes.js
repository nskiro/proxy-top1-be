'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ({response})=>{
  return response.status(200).json({
    status: 'success',
    result: null
  })
})

Route.group(() => {
  Route.post('user/register', 'UserController.create')
  Route.post('user/login', 'UserController.loginUser')
  Route.post('user/info', 'UserController.getInfo').middleware('auth')
  Route.post('user/logout', 'UserController.logoutUser').middleware('auth')

  Route.post('recharge/getQR', 'RechargeController.getQRCode').middleware('auth')
  Route.get('recharge/getBank', 'RechargeController.getBankAcc').middleware('auth')
  Route.post('recharge/received', 'RechargeController.received')
}).prefix('v1')
