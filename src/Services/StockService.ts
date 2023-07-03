import { z } from 'zod'

import { stockSchema, NewStock, newStockSchema } from '../../schema'

import StockRepository from '../Repositories/StockRepository'

const uuidSchema = z.string().uuid().nonempty()
const amountSchema = z.number().int().positive()

class StockService {
  async getAll(walletId: string) {
    const parsedWalletId = uuidSchema.parse(walletId)

    const stocks = await StockRepository.getAll(parsedWalletId)

    return stocks
  }

  async getByTicker(walletId: string, ticker: string) {
    const parsedWalletId = uuidSchema.parse(walletId)

    const stock = await StockRepository.getByTicker(parsedWalletId, ticker)

    const parsedStock = stockSchema.parse(stock)

    return parsedStock
  }

  async create(walletId: string, data: NewStock) {
    const parseData = newStockSchema.parse({ ...data, walletId })

    const sameTicker = await StockRepository.getByTicker(
      walletId,
      parseData.ticker
    )

    if (sameTicker) {
      throw new Error('Stock with same ticker already exists')
    }

    const [stock] = await StockRepository.create(parseData)

    const parsedStock = stockSchema.parse(stock)

    return parsedStock
  }

  async updateAmout(walletId: string, ticker: string, amount: number) {
    const parsedWalletId = uuidSchema.parse(walletId)
    const parsedAmount = amountSchema.parse(amount)

    const [updatedStock] = await StockRepository.updateAmout(
      parsedWalletId,
      ticker,
      parsedAmount
    )

    const parsedStock = stockSchema.parse(updatedStock)

    return parsedStock
  }

  async delete(walletId: string, stockId: number) {
    await StockRepository.delete(walletId, stockId)
  }
}

export default new StockService()
