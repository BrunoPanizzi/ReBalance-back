import { Request, Response } from 'express'

import StockService from '../Services/StockService'

class StockController {
  async index(req: Request, res: Response) {
    try {
      const { walletId } = req.params
      const uid = req.userId!

      const stocks = await StockService.getAll(uid, walletId)

      return res.json(stocks)
    } catch (e) {
      console.log('Error on StockController.index', e)
      return res.sendStatus(400)
    }
  }

  async indexByUser(req: Request, res: Response) {
    try {
      const uid = req.userId!
      const stocks = await StockService.getAllByUser(uid)

      return res.json(stocks)
    } catch (e) {
      console.log('Error on StockController.indexByUser', e)
      return res.sendStatus(400)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { walletId, stockId } = req.params
      const uid = req.userId!

      const stock = await StockService.getByIdAndWallet(uid, walletId, stockId)

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.show', e)
      return res.sendStatus(400)
    }
  }

  async showByTicker(req: Request, res: Response) {
    try {
      const { ticker } = req.params
      const uid = req.userId!

      const stock = await StockService.getByTicker(uid, ticker)

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.show', e)
      return res.sendStatus(400)
    }
  }

  async store(req: Request, res: Response) {
    console.log('got shit here')
    try {
      const { walletId } = req.params
      const stockDetails = req.body
      const uid = req.userId!

      console.log('CREATING')
      console.log('wallet: ', walletId)
      console.log('stockDetails: ', stockDetails)
      console.log('uid: ', uid)

      const stock = await StockService.create(uid, walletId, stockDetails)

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.store', e)
      return res.sendStatus(400)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { walletId, stockId } = req.params
      const { amount } = req.body
      const uid = req.userId!

      const stock = await StockService.updateAmout(
        uid,
        walletId,
        stockId,
        amount
      )

      return res.json(stock)
    } catch (e) {
      console.log('Error on StockController.update', e)
      return res.sendStatus(400)
    }
  }

  async updateMany(req: Request, res: Response) {
    try {
      const { stocks } = req.body
      const uid = req.userId!

      const updatedStocks = await StockService.updateMany(uid, stocks)

      return res.json(updatedStocks)
    } catch (e) {
      console.log('Error on StockController.updateMany', e)
      return res.sendStatus(400)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { walletId, stockId } = req.params
      const uid = req.userId!

      await StockService.delete(uid, walletId, stockId)

      return res.sendStatus(200)
    } catch (e) {
      console.log('Error on StockController.delete', e)
      return res.sendStatus(400)
    }
  }
}

export default new StockController()
