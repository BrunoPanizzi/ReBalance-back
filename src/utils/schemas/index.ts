import { z } from 'zod'

export const emailSchema = z.string().nonempty().email()
export const uuidSchema = z.string().nonempty().uuid()
