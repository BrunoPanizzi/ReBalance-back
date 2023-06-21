import jwt from 'jsonwebtoken'
import { z } from 'zod'

const key = process.env.SECRET_KEY!

const JWTDataSchema = z.object({
  uid: z.string().uuid().nonempty(),
  userName: z.string().nonempty(),
  email: z.string().email().nonempty(),
})

type JWTData = z.infer<typeof JWTDataSchema>

export const parseToken = (token: string): JWTData => {
  return JWTDataSchema.parse(jwt.verify(token, key))
}

export const encode = (userInfo: JWTData) => {
  return jwt.sign(userInfo, key, { expiresIn: '7d' })
}
