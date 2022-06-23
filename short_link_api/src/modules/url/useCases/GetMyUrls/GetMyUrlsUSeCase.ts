import { injectable, inject } from 'tsyringe'
import { IUrlRepository } from '../../repositories/UrlRepository/IUrlRepository'

@injectable()
class GetMyUrlsUseCase {
  constructor(
    @inject('UrlRepository')
    private urlRepository: IUrlRepository
  ) {}

  async exec(userId: string) {
    return await this.urlRepository.findByUserId(userId)
  }
}

export { GetMyUrlsUseCase }
