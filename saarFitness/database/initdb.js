const knex = require('knex')
const fs = require('fs')

const databaseFilePath = './db.db'

// Check if the file exists
if (fs.existsSync(databaseFilePath)) {
  // If the file exists, delete it to create an empty one
  fs.unlinkSync(databaseFilePath)
}

// Create an empty database file
fs.writeFileSync(databaseFilePath, '')

console.log(`Empty database created at "${databaseFilePath}"`)

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.db'
  },
  useNullAsDefault: true
})

db.schema
  .createTable('staff', function (table) {
    table.increments('id').primary()
    table.string('fname').notNullable()
    table.date('dob').notNullable()
    table.date('joined').notNullable()
    table.string('shift').notNullable()
    table.string('type').notNullable()
    table.string('cv')
    table.string('address').notNullable()
    table.string('image')
    table.string('citizenship')
    table.float('salary')
  })
  .then(() => {
    console.log('Created "staff" table')
  })
  .catch(error => {
    console.error('Error creating "staff" table:', error)
  })

db.schema
  .createTable('attendance', function (table) {
    table.increments('id').primary()
    table.integer('customer').notNullable()
    table.timestamp('arrival').notNullable()
    table.timestamp('departure')
  })
  .then(() => {
    console.log('Created "attendance" table')
  })
  .catch(error => {
    console.error('Error creating "attendance" table:', error)
  })

db.schema
  .createTable('customer', function (table) {
    table.increments('id').primary()
    table.string('fname').notNullable()
    table.date('joined').notNullable()
    table.date('dob').notNullable()
    table.string('gender').notNullable()
    table.string('address').notNullable()
    table.string('phone')
    table.string('email')
    table.float('height')
    table.string('image')
    table.float('weight')
    table.string('training_type')
    table.string('emergency_phone')
  })
  .then(() => {
    console.log('Created "customer" table')
  })
  .catch(error => {
    console.error('Error creating "customer" table:', error)
  })

db.schema
  .createTable('conditions', function (table) {
    table.increments('id').primary()
    table.integer('customer').notNullable()
    table.string('type').notNullable()
    table.integer('year').notNullable()
    table.text('detail')
  })
  .then(() => {
    console.log('Created "conditions" table')
  })
  .catch(error => {
    console.error('Error creating "conditions" table:', error)
  })

db.schema
  .createTable('subscription', function (table) {
    table.increments('id').primary()
    table.integer('customer').notNullable()
    table.date('start_date').notNullable()
    table.date('end_date').notNullable()
    table.integer('period').notNullable()
    table.float('price').notNullable()
    table.boolean('paid').notNullable()
  })
  .then(() => {
    console.log('Created "subscription" table')
  })
  .catch(error => {
    console.error('Error creating "subscription" table:', error)
  })
