import { hash, compare } from 'bcryptjs'

export const encrypt = (password: string) => hash(password, 10)

export const verify = (password: string, hashed: string) =>
  compare(password, hashed)
