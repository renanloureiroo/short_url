import { inject, injectable } from 'tsyringe'
import { IUrlRepository } from '../../repositories/UrlRepository/IUrlRepository'

interface GetUrlsParams {
  page?: string
  limit?: string
}

@injectable()
class GetUrlsUseCase {
  constructor(
    @inject('UrlRepository')
    private urlRepository: IUrlRepository
  ) {}

  async exec({ page = '1', limit = '5' }: GetUrlsParams) {
    const links = await this.urlRepository.findAll()

    const total = links.length
    const startIndex = (Number(page) - 1) * Number(limit)
    const endIndex = Number(limit) * Number(page)
    console.log(startIndex, endIndex)
    const responseLinks = links.slice(startIndex, endIndex)

    return {
      links: responseLinks,
      total: total,
    }
  }
}

export { GetUrlsUseCase }
