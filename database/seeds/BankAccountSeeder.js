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
                      .createMany(2,[
                        {
                          bankName: 'Vietcombank',
                          binID: '970436',
                          accName: 'NGUYEN MINH THONG',
                          accNumber: '0111000152596'
                        },{
                          bankName: 'VIB',
                          binID: '970441',
                          accName: 'HO MINH TAM',
                          accNumber: '362099098'
                        }])
  }
}

module.exports = BankAccountSeeder
