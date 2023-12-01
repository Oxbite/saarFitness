const knex = require('knex')
const fs = require('fs')
const databaseFilePath = './db.db'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.db'
  },
  useNullAsDefault: true
})

db.schema
  .createTable('staff_attendance', function (table) {
    table.increments('id').primary()
    table.integer('staff').notNullable()
    table.timestamp('arrival').notNullable()
    table.timestamp('departure')
  })
  .then(() => {
    console.log('Created "stafF_attendance" table')
  })
  .catch(error => {
    console.error('Error creating "attendance" table:', error)
}).finally(()=> {db.destroy()})

