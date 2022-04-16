import { Request, Response } from 'express'
import { DeleteLinkUseCase } from './DeleteLinkUseCase'

class DeleteLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id as string

    const deleteLinkUseCase = new DeleteLinkUseCase()

    deleteLinkUseCase.exec(id)

    return response.end()
  }
}

export { DeleteLinkController }
