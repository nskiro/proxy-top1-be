'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
      username: data[i].username,
      email: data[i].email,
      password: data[i].password,
      isActive: data[i].isActive
  }
})

Factory.blueprint('App/Models/BankAccount', async (faker, i, data) => {
  return {
    bankName: data[i].bankName,
    binID: data[i].binID,
    accNumber: data[i].accNumber
  }
})

