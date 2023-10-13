import { knex, Knex } from 'knex'
import path from 'path'

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve('./database/db.db')
  },
  useNullAsDefault: true
})
