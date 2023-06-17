import 'dotenv/config'

import { type Config } from 'drizzle-kit'

export default {
  schema: './schema.ts',
  out: './drizzle',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
} satisfies Config
