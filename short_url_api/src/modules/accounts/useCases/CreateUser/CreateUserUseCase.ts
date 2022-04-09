import { hash } from 'bcrypt'
import { prisma } from '../../../../database/prisma'
import { AppError } from '../../../../errors/AppError'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

class CreateUserUseCase {
  async exec({ email, name, password }: CreateUserParams) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const passwordHashed = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }
}

export { CreateUserUseCase }
