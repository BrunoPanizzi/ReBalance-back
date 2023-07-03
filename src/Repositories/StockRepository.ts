import { and, eq } from 'drizzle-orm'

import { NewStock, stock } from '../../schema'

import db from '../db'

class StockRepository {
  getAll(walletId: string) {
    return db.query.stock.findMany({
      where: (stock, { eq }) => eq(stock.walletId, walletId),
    })
  }

  getByTicker(walletId: string, ticker: string) {
    return db.query.stock.findFirst({
      where: (stock, { and, eq }) =>
        and(eq(stock.walletId, walletId), eq(stock.ticker, ticker)),
    })
  }

  create(data: NewStock) {
    return db.insert(stock).values(data).returning()
  }

  updateAmout(walletId: string, ticker: string, amount: number) {
    return db
      .update(stock)
      .set({ amount })
      .where(and(eq(stock.walletId, walletId), eq(stock.ticker, ticker)))
      .returning()
  }

  delete(walletId: string, stockId: number) {
    return db
      .delete(stock)
      .where(and(eq(stock.walletId, walletId), eq(stock.id, stockId)))
  }
}

export default new StockRepository()
