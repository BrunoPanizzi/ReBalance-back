import { and, eq } from 'drizzle-orm'

import { NewStock, stock } from '../../schema'

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

  updateAmout(uid: string, walletId: string, ticker: string, amount: number) {
    return db
      .update(stock)
      .set({ amount })
      .where(
        and(
          eq(stock.owner, uid),
          eq(stock.walletId, walletId),
          eq(stock.ticker, ticker)
        )
      )
      .returning()
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
