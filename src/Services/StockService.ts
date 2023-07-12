import { z } from 'zod'

import {
  stockSchema,
  NewStock,
  newStockSchema,
  walletSchema,
  UpdateStocks,
  updateStocksSchema,
} from '../../schema'

import StockRepository from '../Repositories/StockRepository'

const uuidSchema = z.string().uuid().nonempty()
const amountSchema = z.number().int().positive()

const stockWithWalletSchema = stockSchema.extend({
  wallet: walletSchema,
})

class StockService {
  async getAll(uid: string, walletId: string) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWalletId = uuidSchema.parse(walletId)

    const stocks = await StockRepository.getAll(parsedUid, parsedWalletId)

    return stocks
  }

  async getAllByUser(uid: string) {
    const parsedUid = uuidSchema.parse(uid)

    const stocks = await StockRepository.getAllByUser(parsedUid)

    return stocks
  }

  async getByIdAndWallet(uid: string, walletId: string, stockId: string) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWalletId = uuidSchema.parse(walletId)
    const parsedStockId = uuidSchema.parse(stockId)

    const stock = await StockRepository.getById(
      parsedUid,
      parsedWalletId,
      parsedStockId
    )

    const parsedStock = stockSchema.parse(stock)

    return parsedStock
  }

  async getByTicker(uid: string, ticker: string) {
    const parsedUid = uuidSchema.parse(uid)

    const stock = await StockRepository.getByTicker(parsedUid, ticker)

    const parsedStock = stockWithWalletSchema.parse(stock)

    return parsedStock
  }

  async create(uid: string, walletId: string, data: NewStock) {
    const parsedUid = uuidSchema.parse(uid)
    const parseData = newStockSchema.parse({
      ...data,
      walletId,
      owner: parsedUid,
    })

    const sameTicker = await StockRepository.getByTickerAndWallet(
      parsedUid,
      walletId,
      parseData.ticker
    )

    if (sameTicker) {
      throw new Error('Stock with same ticker already exists')
    }

    console.log('parsedData: ', parseData)

    const [stock] = await StockRepository.create(parseData)

    const parsedStock = stockSchema.parse(stock)

    return parsedStock
  }

  async updateAmout(
    uid: string,
    walletId: string,
    stockId: string,
    amount: number
  ) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWalletId = uuidSchema.parse(walletId)
    const parsedStockId = uuidSchema.parse(stockId)
    const parsedAmount = amountSchema.parse(amount)

    const [updatedStock] = await StockRepository.updateAmout(
      parsedUid,
      parsedWalletId,
      parsedStockId,
      parsedAmount
    )

    const parsedStock = stockSchema.parse(updatedStock)

    return parsedStock
  }

  async updateMany(uid: string, data: UpdateStocks) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedData = updateStocksSchema.parse(data)

    const newStocks = await StockRepository.updateMany(parsedUid, parsedData)

    const parsedNewStocks = newStocks.map((stock) => stockSchema.parse(stock))

    return parsedNewStocks
  }

  async delete(uid: string, walletId: string, stockId: string) {
    await StockRepository.delete(uid, walletId, stockId)
  }
}

export default new StockService()
