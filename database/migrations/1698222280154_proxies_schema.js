'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProxiesSchema extends Schema {
  up () {
    this.create('proxies', (table) => {
      table.increments()
      table.integer('proxy_host_id').unsigned().notNullable().references('id').inTable('proxy_hosts')
      table.string('ip_address', 15).notNullable().unique()
      table.integer('port', 5).unsigned().notNullable()
      table.string('username', 10)
      table.string('password', 10)
      table.string('allowed_from_ip', 15)
      table.timestamps()
    })
  }

  down () {
    this.drop('proxies')
  }
}

module.exports = ProxiesSchema
