import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from '../../../../errors/AppError'

import { injectable, inject } from 'tsyringe'
import { IUserRepository } from '../../../../repositories/UserRepository/IUserRepository'

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

@injectable()
class AuthenticatedUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async exec({ email, password }: AuthenticateParams): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

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
