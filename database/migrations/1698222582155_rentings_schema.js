'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RentingsSchema extends Schema {
  up () {
    this.create('rentings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('proxy_id').unsigned().notNullable().references('id').inTable('proxies')
      table.integer('duration', 5).unsigned().notNullable()
      table.integer('rotate_limit_time', 3).unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rentings')
  }
}

module.exports = RentingsSchema
