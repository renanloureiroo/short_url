import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

import { container } from 'tsyringe'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    console.log(name, email, password)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.exec({ name, email, password })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
