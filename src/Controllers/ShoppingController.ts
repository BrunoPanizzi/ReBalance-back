import { Request, Response } from 'express'

import ShoppingService from '../Services/ShoppingService'

class ShoppingController {
  async all(req: Request, res: Response) {
    try {
      const uid = req.userId
      const { amount, blackListedIds } = req.body

      if (!uid) {
        return res.sendStatus(400)
      }

      const purchases = await ShoppingService.all(uid, amount, blackListedIds)

      return res.json(purchases)
    } catch (e) {
      console.log('Error on ShoppingController.all', e)
      return res.sendStatus(400)
    }
  }
}

export default new ShoppingController()
