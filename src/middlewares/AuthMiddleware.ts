import { parseToken } from '../utils/jwt'

import { NextFunction, Request, Response } from 'express'

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(401)
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = parseToken(token)

    req.userId = data.uid

    next()
  } catch {
    return res.sendStatus(401)
  }
}
