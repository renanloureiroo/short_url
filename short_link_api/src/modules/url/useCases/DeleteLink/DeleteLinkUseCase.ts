import { injectable, inject } from 'tsyringe'
import { IUrlRepository } from '../../../../repositories/UrlRepository/IUrlRepository'

@injectable()
class DeleteLinkUseCase {
  constructor(
    @inject('UrlRepository')
    private urlRepository: IUrlRepository
  ) {}

  async exec(id: string): Promise<void> {
    await this.urlRepository.delete(id)
    return
  }
}

export { DeleteLinkUseCase }
