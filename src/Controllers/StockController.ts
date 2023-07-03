import { Request, Response } from 'express'

import StockService from '../Services/StockService'

class StockController {
  async index(req: Request, res: Response) {
    try {
      const { walletId } = req.params

      const stocks = await StockService.getAll(walletId)

      return res.json(stocks)
    } catch (e) {
      console.log('Error on StockController.index', e)
      return res.sendStatus(400)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { walletId, ticker } = req.params

      const stock = await StockService.getByTicker(walletId, ticker)

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.show', e)
      return res.sendStatus(400)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { walletId } = req.params
      const stockDetails = req.body
      const uid = req.userId

      const stock = await StockService.create(walletId, stockDetails)

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.store', e)
      return res.sendStatus(400)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { walletId, ticker } = req.params
      const { amount } = req.body

      const stock = await StockService.updateAmout(walletId, ticker, amount)

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.update', e)
      return res.sendStatus(400)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { walletId, stockId } = req.params

      await StockService.delete(walletId, Number(stockId))

      return res.sendStatus(200)
    } catch (e) {
      console.log('Error on StockController.delete', e)
      return res.sendStatus(400)
    }
  }
}

export default new StockController()
