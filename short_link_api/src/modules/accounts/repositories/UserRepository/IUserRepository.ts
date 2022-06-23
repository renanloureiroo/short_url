import { User } from '@prisma/client'

interface ICreateUserDTO {
  name: string
  email: string
  password: string
}

interface IUserRepository {
  create({ email, name, password }: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}

export { IUserRepository, ICreateUserDTO }
