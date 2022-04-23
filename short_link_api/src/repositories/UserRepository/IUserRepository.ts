import { User } from '../../entities/User'

interface ICreateUserDTO {
  name: string
  email: string
  password: string
}

interface IUserRepository {
  create({ email, name, password }: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUserRepository, ICreateUserDTO }
