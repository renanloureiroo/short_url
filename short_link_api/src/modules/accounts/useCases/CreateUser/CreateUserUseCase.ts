import { injectable, inject } from 'tsyringe'
import { hash } from 'bcrypt'
import { prisma } from '../../../../database/prisma'
import { AppError } from '../../../../errors/AppError'
import { IUserRepository } from '../../../../repositories/UserRepository/IUserRepository'

interface CreateUserParams {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async exec({ email, name, password }: CreateUserParams) {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.userRepository.create({
      email,
      name,
      password: passwordHashed,
    })

    return user
  }
}

export { CreateUserUseCase }
