import { Request, Response } from 'express'
import { GetMyUrlsUseCase } from './GetMyUrlsUSeCase'

import { container } from 'tsyringe'

class GetMyUrlsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request

    const getMyUrlsUseCase = container.resolve(GetMyUrlsUseCase)

    const urls = await getMyUrlsUseCase.exec(user.id)

    return response.json(urls)
  }
}

export { GetMyUrlsController }
