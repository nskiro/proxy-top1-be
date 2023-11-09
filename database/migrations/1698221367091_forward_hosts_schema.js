'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForwardHostsSchema extends Schema {
  up () {
    this.create('forward_hosts', (table) => {
      table.increments()
      table.string('host_name', 255).notNullable().unique()
      table.string('ip_address', 15).notNullable().unique()
      table.string('username', 10).notNullable()
      table.string('password', 10).notNullable()
      table.string('vps_provider', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('forward_hosts')
  }
}

module.exports = ForwardHostsSchema
