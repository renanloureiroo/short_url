import { Request, Response } from 'express'
import { MeUseCase } from './MeUseCase'

class MeController {
  async handle(request: Request, response: Response) {
    const { user: userAuthenticated } = request

    const meUseCase = new MeUseCase()

    const user = meUseCase.exec(userAuthenticated.id)

    return response.json(user)
  }
}
export { MeController }
