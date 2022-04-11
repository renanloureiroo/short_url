import { Router } from 'express'
import { AuthenticatedController } from '../modules/accounts/useCases/Authenticated/AuthenticatedController'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController'

const accountsRoutes = Router()

accountsRoutes.post('/create', new CreateUserController().handle)
accountsRoutes.post('/authenticate', new AuthenticatedController().handle)

export { accountsRoutes }
