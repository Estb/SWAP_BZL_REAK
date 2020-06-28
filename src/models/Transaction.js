const Sequelize = require('sequelize')
const Database = require('../database/database')

const Transactions = Database.define('transactions', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  updated: {
    allowNull: true,
    type: Sequelize.INTEGER
  },
  bzlAddress: {
    allowNull: false,
    type: Sequelize.STRING(40)
  },
  ethAddress: {
    allowNull: false,
    type: Sequelize.STRING
  },
  amountBzl: {
    allowNull: true,
    type: Sequelize.STRING
  },
  amountReak: {
    allowNull: true,
    type: Sequelize.STRING
  },
  pay:{
    allowNull: true,
    type: Sequelize.STRING
  }
})

module.exports = Transactions