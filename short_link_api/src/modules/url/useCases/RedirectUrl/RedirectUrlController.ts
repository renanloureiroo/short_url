import { Request, Response } from 'express'
import { RedirectUrlUseCase } from './RedirectUrlUseCase'

class RedirectUrlController {
  async handle(request: Request, response: Response) {
    const link = request.params.link

    const redirectUrlUseCase = new RedirectUrlUseCase()

    const UrlReturn = await redirectUrlUseCase.exec(link)
    if (UrlReturn) {
      return response.redirect(UrlReturn.url)
    } else {
      return response.status(404).send('NOT FOUND')
    }
  }
}

export { RedirectUrlController }
