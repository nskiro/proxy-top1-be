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
                          bank_name: 'Vietcombank',
                          bin_id: '970436',
                          acc_name: 'NGUYEN MINH THONG',
                          acc_number: '0111000152596'
                        },{
                          bank_name: 'VIB',
                          bin_id: '970441',
                          acc_name: 'HO MINH TAM',
                          acc_number: '362099098'
                        }])
  }
}

module.exports = BankAccountSeeder
