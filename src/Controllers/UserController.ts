import { Request, Response } from 'express'

import UserService from '../Services/UserService'

class UserController {
  async index(_, res: Response) {
    try {
      const allUsers = await UserService.getAll()

      return res.json(allUsers)
    } catch (e) {
      console.log('Something went wrong on user index.')
      console.log(e)

      return res.sendStatus(500)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { uid } = req.params

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

      const u = await UserService.create(userData)

      return res.json(u)
    } catch (e) {
      console.log('Something went wrong on user store.')
      console.log(e)

      return res.sendStatus(400)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userData = req.body
      const { uid } = req.params

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
      const { uid } = req.params

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
