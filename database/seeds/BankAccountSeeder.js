'use strict'

/*
|--------------------------------------------------------------------------
| BankAccountSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class BankAccountSeeder {
  async run () {
    const bankAcc = await Factory
                      .model('App/Models/BankAccount')
                      .createMany(1,[
                        {
                          bankName: 'Vietcombank',
                          binID: '970436',
                          accNumber: '0111000152596'
                        }])
  }
}

module.exports = BankAccountSeeder
