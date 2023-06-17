import { relations, InferModel } from 'drizzle-orm'
import {
  pgTable,
  real,
  text,
  uuid,
  pgEnum,
  varchar,
  integer,
  serial,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// User
export const user = pgTable('user', {
  uid: uuid('uid').primaryKey().defaultRandom().notNull(),
  userName: text('user_name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export const userRelations = relations(user, ({ many }) => ({
  wallets: many(wallet),
}))

export type User = InferModel<typeof user>
export type NewUser = InferModel<typeof user, 'insert'>
export type UpdateUser = Omit<User, 'password' | 'uid'>

export const userSchema = createSelectSchema(user, {
  email: z.string().nonempty().email(),
  password: z.undefined(),
})
export const newUserSchema = createInsertSchema(user, {
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(6),
})
export const updateUserSchema = userSchema.omit({
  password: true,
  uid: true,
})

// tailwind css colors
export const colorEnum = pgEnum('color', [
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
])

// wallets
export const wallet = pgTable('wallet', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  totalValue: real('total_value').default(0).notNull(),
  idealPercentage: real('ideal_percentage').default(0).notNull(),
  realPercentage: real('real_percentage').default(0).notNull(),
  color: colorEnum('color'),

  owner: uuid('owner').references(() => user.uid),
})

export const walletRelations = relations(wallet, ({ one, many }) => ({
  owner: one(user, {
    fields: [wallet.owner],
    references: [user.uid],
  }),
  stocks: many(stock),
}))

// stocks
export const stock = pgTable('stock', {
  id: serial('id').primaryKey().notNull(),
  ticker: varchar('ticker', { length: 10 }).notNull(),
  amount: integer('amount').default(0).notNull(),

  walletId: uuid('wallet_id').references(() => wallet.id),
})

export const stockRelations = relations(stock, ({ one }) => ({
  wallet: one(wallet, {
    fields: [stock.walletId],
    references: [wallet.id],
  }),
}))
