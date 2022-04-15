import { Request, Response } from 'express'
import { GetUrlsUseCase } from './GetUrlsUseCase'

class GetUrlsController {
  async handle(request: Request, response: Response) {
    const page = request.query.page as string
    const limit = request.query.limit as string

    const getUrlsUseCase = new GetUrlsUseCase()

    const { links, total } = await getUrlsUseCase.exec({ page, limit })
    console.log(links)

    return response.setHeader('X-Total-Count', total).json(links)
  }
}

export { GetUrlsController }
