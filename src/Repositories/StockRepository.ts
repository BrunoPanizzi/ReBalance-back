import { SQL, and, eq, sql } from 'drizzle-orm'

import { NewStock, UpdateStocks, stock } from '../../schema'

import db from '../db'

class StockRepository {
  getAll(uid: string, walletId: string) {
    return db.query.stock.findMany({
      where: (stock, { eq, and }) =>
        and(eq(stock.walletId, walletId), eq(stock.owner, uid)),
    })
  }

  getAllByUser(uid: string) {
    return db.query.stock.findMany({
      where: (stock, { eq }) => eq(stock.owner, uid),
    })
  }

  getById(uid: string, walletId: string, id: string) {
    return db.query.stock.findFirst({
      where: (stock, { and, eq }) =>
        and(
          eq(stock.owner, uid),
          eq(stock.walletId, walletId),
          eq(stock.id, id)
        ),
    })
  }

  getByTicker(uid: string, ticker: string) {
    return db.query.stock.findFirst({
      where: (stock, { and, eq }) =>
        and(eq(stock.owner, uid), eq(stock.ticker, ticker)),

      with: {
        wallet: true,
      },
    })
  }

  getByTickerAndWallet(uid: string, walletId: string, ticker: string) {
    return db.query.stock.findFirst({
      where: (stock, { and, eq }) =>
        and(
          eq(stock.owner, uid),
          eq(stock.walletId, walletId),
          eq(stock.ticker, ticker)
        ),
    })
  }

  create(data: NewStock) {
    return db.insert(stock).values(data).returning()
  }

  updateAmout(uid: string, walletId: string, stockId: string, amount: number) {
    return db
      .update(stock)
      .set({ amount })
      .where(
        and(
          eq(stock.owner, uid),
          eq(stock.walletId, walletId),
          eq(stock.id, stockId)
        )
      )
      .returning()
  }

  // TODO: refactor this if drizzle get an update
  updateMany(uid: string, data: UpdateStocks) {
    const sqlChunks: SQL[] = []
    const idsChunks: SQL[] = []

    data.forEach((s) => {
      idsChunks.push(sql`${s.id}`)
    })

    const finalIds = sql.join(idsChunks, sql.raw(','))

    sqlChunks.push(sql`update ${stock} set "amount"`) // this might be bad, but it does not accpet ${stock.amount}

    sqlChunks.push(sql`= case`)

    data.forEach((s) => {
      sqlChunks.push(
        sql`when "id" = ${s.id} and "owner" = ${uid} then ${s.amount}`
      )
    })

    sqlChunks.push(sql`else "amount"`)
    sqlChunks.push(sql`end`)

    sqlChunks.push(sql`where "id" in (${finalIds})`)

    sqlChunks.push(sql`returning *, wallet_id as "walletId"`) // this is where I miss the ORM

    const finalSql = sql.join(sqlChunks, sql.raw(' '))

    return db.execute(finalSql)
  }

  delete(uid: string, walletId: string, stockId: string) {
    return db
      .delete(stock)
      .where(
        and(
          eq(stock.owner, uid),
          eq(stock.walletId, walletId),
          eq(stock.id, stockId)
        )
      )
  }
}

export default new StockRepository()
