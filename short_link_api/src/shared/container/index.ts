import { container } from 'tsyringe'
import { UrlRepository } from '../../repositories/UrlRepository/implementations'
import { IUrlRepository } from '../../repositories/UrlRepository/IUrlRepository'
import { UserRepository } from '../../repositories/UserRepository/implementations'
import { IUserRepository } from '../../repositories/UserRepository/IUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository)
