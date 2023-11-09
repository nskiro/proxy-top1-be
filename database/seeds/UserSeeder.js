'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const user = await Factory
                      .model('App/Models/User')
                      .createMany(2,[
                        {
                          username: 'minhtam91',
                          email: 'minhtamho91@gmail.com',
                          password: 'e10adc3949ba59abbe56e057f20f883e',
                          is_active: true
                        },{
                          username: 'thanhdat91',
                          email: 'dtd081291@gmail.com',
                          password: 'e10adc3949ba59abbe56e057f20f883e',
                          is_active: true
                        }])
  }
}

module.exports = UserSeeder
