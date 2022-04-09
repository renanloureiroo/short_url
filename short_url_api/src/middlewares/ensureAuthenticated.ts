import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'
interface IPayload {
  sub: string
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, token] = authHeader

  try {
    const { sub: user_id } = verify(
      token,
      '9d522b6bf33a392bf157cbab121cc976'
    ) as IPayload

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) throw new AppError('User does not exits', 401)

    request.user = {
      id: user_id,
    }
    return next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}

export { ensureAuthenticated }
