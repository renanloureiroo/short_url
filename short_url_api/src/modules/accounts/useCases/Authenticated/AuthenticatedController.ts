import { Request, Response } from 'express'
import { AuthenticatedUseCase } from './AuthenticatedUseCase'

interface IRequest {
  email: string
  password: string
}

class AuthenticatedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password }: IRequest = request.body

    const authenticatedUseCase = new AuthenticatedUseCase()

    const token = await authenticatedUseCase.exec({ email, password })

    return response.json(token)
  }
}

export { AuthenticatedController }
