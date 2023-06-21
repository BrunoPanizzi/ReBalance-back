import { z } from 'zod'

import { verifyPassword } from '../hashing'

import AuthRepository from '../Repositories/AuthRepository'
import { encode } from '../utils/jwt'

const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
})

type LoginInfo = z.infer<typeof loginSchema>

class AuthService {
  async authenticate(obj: LoginInfo) {
    const info = loginSchema.parse(obj)

    const user = await AuthRepository.getUserByEmail(info.email)

    if (!user) {
      throw new Error('User not found')
    }

    const matches = await verifyPassword(info.password, user.password)

    if (!matches) {
      throw new Error('Password does not match')
    }

    const userInfo = {
      uid: user.uid,
      userName: user.userName,
      email: user.email,
    }

    const token = encode(userInfo)

    return {
      user: userInfo,
      token,
    }
  }
}

export default new AuthService()
