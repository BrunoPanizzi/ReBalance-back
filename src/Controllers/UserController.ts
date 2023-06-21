import { Request, Response } from 'express'

import UserService from '../Services/UserService'
import { encode } from '../utils/jwt'

class UserController {
  async show(req: Request, res: Response) {
    try {
      const uid = req.userId

      const u = await UserService.getByUid(uid)

      return res.json(u)
    } catch (e) {
      console.log('Something went wrong on user show.')
      console.log(e)

      return res.sendStatus(400)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const userData = req.body

      const user = await UserService.create(userData)

      const token = encode(user)

      const data: {
        user: {
          uid: string
          userName: string
          email: string
        }
        token: string
      } = { user, token }

      return res.json(data)
    } catch (e) {
      console.log('Something went wrong on user store.')
      console.log(e)

      return res.sendStatus(400)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userData = req.body
      const uid = req.userId

      const newUser = await UserService.update(uid, userData)

      return res.json(newUser)
    } catch (e) {
      console.log('Something went wrong on user update.')
      console.log(e)

      return res.sendStatus(400)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const uid = req.userId

      await UserService.deleteByUid(uid)

      return res.sendStatus(204)
    } catch (e) {
      console.log('Something went wrong on user delete.')
      console.log(e)

      return res.sendStatus(400)
    }
  }
}

export default new UserController()
