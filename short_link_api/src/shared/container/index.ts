import { container } from 'tsyringe'

import { UserRepository } from '../../modules/accounts/repositories/UserRepository/implementations'
import { IUserRepository } from '../../modules/accounts/repositories/UserRepository/IUserRepository'
import { UrlRepository } from '../../modules/url/repositories/UrlRepository/implementations'
import { IUrlRepository } from '../../modules/url/repositories/UrlRepository/IUrlRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository)
