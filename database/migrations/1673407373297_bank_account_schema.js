'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankAccountSchema extends Schema {
  up () {
    this.create('bank_accounts', (table) => {
      table.increments()
      table.string('bank_name', 255).notNullable().unique()
      table.string('bin_id', 6).notNullable().unique().index()
      table.string('acc_name', 30).notNullable()
      table.string('acc_number', 20).notNullable().unique().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_accounts')
  }
}

module.exports = BankAccountSchema
