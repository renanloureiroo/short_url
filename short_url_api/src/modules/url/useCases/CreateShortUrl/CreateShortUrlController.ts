import { Request, Response } from 'express'
import { CreateShotUrlUseCase } from './CreateShortUrlUseCase'

interface IRequest {
  urlOriginal: string
  userId?: string
}

class CreateShotUrlController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { urlOriginal, userId }: IRequest = request.body

    const createShortUrlUseCase = new CreateShotUrlUseCase()

    const urlShort = await createShortUrlUseCase.exec({
      url: urlOriginal,
      userId,
    })

    return response.status(201).json(urlShort)
  }
}

export { CreateShotUrlController }
