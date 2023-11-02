'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BankAccount extends Model {
  rechargeUsers() {
    return this.belongsToMany('App/Models/User').pivotModel('App/Models/RechargeHistory')
  }
}

module.exports = BankAccount
