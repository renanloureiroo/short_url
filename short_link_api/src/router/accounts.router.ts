import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { AuthenticatedController } from '../modules/accounts/useCases/Authenticated/AuthenticatedController'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController'
import { MeController } from '../modules/accounts/useCases/Me/MeController'

const accountsRoutes = Router()

accountsRoutes.get('/me', ensureAuthenticated, new MeController().handle)
accountsRoutes.post('/signin', new AuthenticatedController().handle)
accountsRoutes.post('/signup', new CreateUserController().handle)

export { accountsRoutes }
