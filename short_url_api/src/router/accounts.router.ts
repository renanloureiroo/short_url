import { Router } from 'express'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController'

const accountsRoutes = Router()

accountsRoutes.post('/', new CreateUserController().handle)

export { accountsRoutes }
