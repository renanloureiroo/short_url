import { Request, Response } from 'express'
import { DeleteLinkUseCase } from './DeleteLinkUseCase'

class DeleteLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string

    console.log(id)

    const deleteLinkUseCase = new DeleteLinkUseCase()

    await deleteLinkUseCase.exec(id)

    return response.end()
  }
}

export { DeleteLinkController }
