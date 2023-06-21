import { hash, compare } from 'bcryptjs'

export const encryptPassword = (password: string) => hash(password, 10)

export const verifyPassword = (password: string, hashed: string) =>
  compare(password, hashed)
