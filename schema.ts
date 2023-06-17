import { relations, InferModel } from 'drizzle-orm'
import {
  pgTable,
  real,
  text,
  uuid,
  varchar,
  integer,
  serial,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { pgColorEnum, colorsSchema, type Colors } from './src/tailwindCssColors'

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

// Wallets
export const wallet = pgTable('wallet', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  totalValue: real('total_value').default(0).notNull(),
  idealPercentage: real('ideal_percentage').default(0).notNull(),
  realPercentage: real('real_percentage').default(0).notNull(),
  color: pgColorEnum('color').notNull(),

  owner: uuid('owner')
    .notNull()
    .references(() => user.uid),
})

export const walletRelations = relations(wallet, ({ one, many }) => ({
  owner: one(user, {
    fields: [wallet.owner],
    references: [user.uid],
  }),
  stocks: many(stock),
}))

export type Wallet = InferModel<typeof wallet>
export type NewWallet = InferModel<typeof wallet, 'insert'>
export type UpdateWallet = Partial<Omit<Wallet, 'id' | 'owner'>>

export const walletSchema = createSelectSchema(wallet, {
  title: z.string().nonempty(),
  totalValue: z.number().nonnegative(),
  idealPercentage: z.number().min(0).max(1),
  realPercentage: z.number().min(0).max(1),
  color: colorsSchema,
  id: z.string().uuid(),
  owner: z.string().uuid().nonempty(),
})

export const newWalletSchema = createInsertSchema(wallet, {
  title: z.string().nonempty(),
  idealPercentage: z.number().min(0).max(1),
  color: colorsSchema,
  owner: z.string().uuid().nonempty(),
})

export const updateWalletSchema = walletSchema
  .omit({
    id: true,
    owner: true,
  })
  .partial()

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
