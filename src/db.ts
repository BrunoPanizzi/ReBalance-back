import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

const migrationClient = postgres()

migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })

const client = postgres()

const db = drizzle(client)

export default db
