import { Request, Response } from 'express'
import { MeUseCase } from './MeUseCase'
import { container } from 'tsyringe'

class MeController {
  async handle(request: Request, response: Response) {
    const { user: userAuthenticated } = request

    const meUseCase = container.resolve(MeUseCase)

    const user = await meUseCase.exec(userAuthenticated.id)

    return response.json(user)
  }
}
export { MeController }
