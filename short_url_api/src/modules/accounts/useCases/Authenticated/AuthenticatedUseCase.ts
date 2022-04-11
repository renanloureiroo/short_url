import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../../database/prisma'
import { AppError } from '../../../../errors/AppError'

interface AuthenticateParams {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

class AuthenticatedUseCase {
  async exec({ email, password }: AuthenticateParams): Promise<IResponse> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, '9d522b6bf33a392bf157cbab121cc976', {
      subject: user.id,
      expiresIn: '1d',
    })

    const response = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }

    return response
  }
}

export { AuthenticatedUseCase }
