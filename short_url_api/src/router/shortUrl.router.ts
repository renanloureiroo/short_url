import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateShotUrlController } from '../modules/url/useCases/CreateShortUrl/CreateShortUrlController'
import { GetMyUrlsController } from '../modules/url/useCases/GetMyUrls/GetMyUrlsController'

const shortUrlRoutes = Router()

shortUrlRoutes.get('/me', ensureAuthenticated, new GetMyUrlsController().handle)
shortUrlRoutes.post('/shorten', new CreateShotUrlController().handle)

export { shortUrlRoutes }
