'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RechargeHistorySchema extends Schema {
  up () {
    this.create('recharge_histories', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('bank_acc_id').unsigned().notNullable().references('id').inTable('bank_accounts')
      table.integer('rechargeAmount').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('recharge_histories')
  }
}

module.exports = RechargeHistorySchema
