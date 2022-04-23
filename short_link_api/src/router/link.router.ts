import { Router } from 'express'
import { RedirectUrlController } from '../modules/url/useCases/RedirectUrl/RedirectUrlController'

const linkRouter = Router()

linkRouter.get('/:link', new RedirectUrlController().handle)

export { linkRouter }
