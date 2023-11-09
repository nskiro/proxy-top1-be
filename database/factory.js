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
      is_active: data[i].is_active
  }
})

Factory.blueprint('App/Models/BankAccount', async (faker, i, data) => {
  return {
    bank_name: data[i].bank_name,
    bin_id: data[i].bin_id,
    acc_name: data[i].acc_name,
    acc_number: data[i].acc_number
  }
})

