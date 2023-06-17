import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

const colors = [
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
] as const

export const colorsSchema = z.enum(colors)

export const pgColorEnum = pgEnum('color', colors)

export type Colors = z.infer<typeof colorsSchema>
