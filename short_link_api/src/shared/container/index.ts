import { container } from 'tsyringe'
import { UserRepository } from '../../repositories/UserRepository/implementations'
import { IUserRepository } from '../../repositories/UserRepository/IUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
