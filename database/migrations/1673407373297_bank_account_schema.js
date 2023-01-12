'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankAccountSchema extends Schema {
  up () {
    this.create('bank_accounts', (table) => {
      table.increments()
      table.string('bankName', 255).notNullable().unique()
      table.string('binID', 6).notNullable().unique().index()
      table.string('accName', 30).notNullable()
      table.string('accNumber', 20).notNullable().unique().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_accounts')
  }
}

module.exports = BankAccountSchema
