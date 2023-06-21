import { Request, Response } from 'express'

import AuthService from '../Services/AuthService'

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const loggedUserInfo = await AuthService.authenticate({ email, password })

      return res.send(loggedUserInfo)
    } catch (e) {
      console.log(e)

      return res.sendStatus(401)
    }
  }
}

export default new AuthController()
