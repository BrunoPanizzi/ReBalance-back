import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import {
  user,
  userRelations,
  wallet,
  walletRelations,
  stock,
  stockRelations,
} from '../schema'

const migrationClient = postgres()

migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })

const client = postgres()

const schema = {
  user,
  userRelations,
  wallet,
  walletRelations,
  stock,
  stockRelations,
}

const db = drizzle(client, { schema })

export default db
