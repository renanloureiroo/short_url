import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateShotUrlController } from '../modules/url/useCases/CreateShortUrl/CreateShortUrlController'
import { GetMyUrlsController } from '../modules/url/useCases/GetMyUrls/GetMyUrlsController'

const shortUrlRoutes = Router()

shortUrlRoutes.post('/', new CreateShotUrlController().handle)
shortUrlRoutes.get('/my', ensureAuthenticated, new GetMyUrlsController().handle)

export { shortUrlRoutes }
