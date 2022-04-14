import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { CreateShotUrlController } from '../modules/url/useCases/CreateShortUrl/CreateShortUrlController'
import { GetMyUrlsController } from '../modules/url/useCases/GetMyUrls/GetMyUrlsController'

const shortUrlRoutes = Router()

shortUrlRoutes.get('/me', ensureAuthenticated, new GetMyUrlsController().handle)
shortUrlRoutes.post(
  '/shorten',
  verifyAuthenticated,
  new CreateShotUrlController().handle
)

export { shortUrlRoutes }
