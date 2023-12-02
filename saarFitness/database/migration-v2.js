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
  .alterTable("subscription", (table)=> {
    table.string("payment_method")
  })
  .then(() => {
    console.log('Added payment method to subscription table')
  })
  .catch(error => {
    console.error('err', error)
}).finally(()=> {db.destroy()})

db.schema
  .alterTable("trainer", (table)=> {
    table.string("payment_method")
  })
  .then(() => {
    console.log('Added payment method to trainer table')
  })
  .catch(error => {
    console.error('err', error)
}).finally(()=> {db.destroy()})

db.schema
  .alterTable("conditions", (table)=> {
    table.string("month")
  })
  .then(() => {
    console.log('Added month to conditions table')
  })
  .catch(error => {
    console.error('err', error)
}).finally(()=> {db.destroy()})

