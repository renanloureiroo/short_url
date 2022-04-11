import { Router } from 'express'
import { accountsRoutes } from './accounts.router'
import { shortUrlRoutes } from './shortUrl.router'
const router = Router()

router.use('/accounts', accountsRoutes)
router.use('/links', shortUrlRoutes)

export { router }
