'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProxyHostsSchema extends Schema {
  up () {
    this.create('proxy_hosts', (table) => {
      table.increments()
      table.integer('forward_host_id').unsigned().notNullable().references('id').inTable('forward_hosts')
      table.string('host_name', 255).notNullable().unique()
      table.string('username', 10).notNullable()
      table.string('password', 10).notNullable()
      table.string('location', 255).notNullable()
      table.string('network_isp', 255).notNullable()
      table.integer('base_port', 5).unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('proxy_hosts')
  }
}

module.exports = ProxyHostsSchema
