import { Router } from 'express'
import { AuthenticatedController } from '../modules/accounts/useCases/Authenticated/AuthenticatedController'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController'

const accountsRoutes = Router()

accountsRoutes.post('/me', new AuthenticatedController().handle)
accountsRoutes.post('/signup', new CreateUserController().handle)

export { accountsRoutes }
