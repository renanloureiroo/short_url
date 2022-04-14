import { Router } from 'express'
import { accountsRoutes } from './accounts.router'
import { shortUrlRoutes } from './shortUrl.router'
const router = Router()

router.use('/account', accountsRoutes)
router.use('/links', shortUrlRoutes)

export { router }
