import { User } from '../../../entities/User'
import { ICreateUserDTO, IUserRepository } from '../IUserRepository'

class UserRepository implements IUserRepository {
  create({ email, name, password }: ICreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.')
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
