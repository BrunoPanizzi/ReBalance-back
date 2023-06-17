import { Request, Response } from 'express'
import WalletService from '../Services/WalletService'

class WalletController {
  async index(req: Request, res: Response) {
    try {
      const { uid } = req.params

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
      const { uid, walletId } = req.params

      const wallet = await WalletService.getById(uid, walletId)

      return res.json(wallet)
    } catch (e) {
      console.log('Something went wrong: Controller: WalletController: show')
      console.log(e)

      return res.sendStatus(400)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { uid } = req.params
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
      const { uid, walletId } = req.params
      const walletData = req.body

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
      const { uid, walletId } = req.params

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
