import { Request, Response } from 'express'
import WalletService from '../Services/WalletService'

class WalletController {
  async index(req: Request, res: Response) {
    try {
      const uid = req.userId

      if (!uid) {
        return res.sendStatus(401) // should not happen because the middleware, but just for another layer
      }

      const wallets = await WalletService.getAll(uid)

      return res.json(wallets)
    } catch (e) {
      console.log('Something went wrong: Controller: WalletController: index')
      console.log(e)

      res.sendStatus(400)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { walletId } = req.params
      const withStocks = String(req.query.withStocks)
      const uid = req.userId

      if (!uid) {
        return res.sendStatus(401)
      }

      const wallet = await WalletService.getById(uid, walletId, withStocks)

      return res.json(wallet)
    } catch (e) {
      console.log('Something went wrong: Controller: WalletController: show')
      console.log(e)

      return res.sendStatus(400)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const uid = req.userId

      if (!uid) {
        return res.sendStatus(401)
      }

      const walletDetails = req.body

      const wallet = await WalletService.create(uid, walletDetails)

      return res.json(wallet)
    } catch (e) {
      console.log('Something went wrong: Controller: WalletController: store')
      console.log(e)

      res.sendStatus(400)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { walletId } = req.params

      const uid = req.userId

      const walletData = req.body

      if (!uid) {
        return res.sendStatus(401)
      }

      const newWallet = await WalletService.update(uid, walletId, walletData)

      return res.json(newWallet)
    } catch (e) {
      console.log('Something went wrong: Controller: WalletController: update')
      console.log(e)

      res.sendStatus(400)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { walletId } = req.params

      const uid = req.userId

      if (!uid) {
        return res.sendStatus(401)
      }

      await WalletService.deleteById(uid, walletId)

      return res.sendStatus(204)
    } catch (e) {
      console.log('Something went wrong: Controller: WalletController: delete')
      console.log(e)

      res.sendStatus(400)
    }
  }
}

export default new WalletController()
