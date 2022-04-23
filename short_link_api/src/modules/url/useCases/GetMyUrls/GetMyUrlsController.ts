import { Request, Response } from 'express'
import { GetMyUrlsUseCase } from './GetMyUrlsUSeCase'

class GetMyUrlsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request

    const getMyUrlsUseCase = new GetMyUrlsUseCase()

    const urls = await getMyUrlsUseCase.exec(user.id)

    return response.json(urls)
  }
}

export { GetMyUrlsController }
