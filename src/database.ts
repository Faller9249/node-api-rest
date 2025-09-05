import 'dotenv/config'
import knex from 'knex'
import type { Knex } from 'knex'
import { env } from './env/index.js'

export const config: Knex.Config = {
  client: 'sqlite3', // detalhe: o nome certo do client é "sqlite3"
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: false,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const db = knex(config)
