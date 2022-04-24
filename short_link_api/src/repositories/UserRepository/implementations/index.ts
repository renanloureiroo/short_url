import { User } from '@prisma/client'
import { prisma } from '../../../database/prisma'

import { ICreateUserDTO, IUserRepository } from '../IUserRepository'

class UserRepository implements IUserRepository {
  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}

export { UserRepository }
