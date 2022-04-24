import { prisma } from '../../../../database/prisma'

import { inject, injectable } from 'tsyringe'
import { IUrlRepository } from '../../../../repositories/UrlRepository/IUrlRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class RedirectUrlUseCase {
  constructor(
    @inject('UrlRepository')
    private urlRepository: IUrlRepository
  ) {}

  async exec(shortUrl: string) {
    const link = await this.urlRepository.findByShortUrl(shortUrl)

    if (!link) {
      throw new AppError('Link not found', 404)
    }

    await this.urlRepository.incrementeVisits(link.id)

    return link
  }
}

export { RedirectUrlUseCase }
