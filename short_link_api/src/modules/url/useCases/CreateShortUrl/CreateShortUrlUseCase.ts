import { nanoid } from 'nanoid'
import validator from 'validator'
import { prisma } from '../../../../database/prisma'
import { AppError } from '../../../../errors/AppError'
import { injectable, inject } from 'tsyringe'
import { IUrlRepository } from '../../repositories/UrlRepository/IUrlRepository'

interface CreateShortUrlParams {
  url: string
  userId?: string | null
}

@injectable()
class CreateShotUrlUseCase {
  constructor(
    @inject('UrlRepository')
    private urlRepository: IUrlRepository
  ) {}

  async exec({ url, userId = null }: CreateShortUrlParams) {
    const urlValid = validator.isURL(url)
    if (!urlValid) throw new AppError('Url invalid')

    const urlAlreadyExits = await this.urlRepository.findByUrl(url)

    if (urlAlreadyExits) {
      return urlAlreadyExits
    }

    const newShortUrl = nanoid(6)

    return await this.urlRepository.create({
      url,
      shortUrl: newShortUrl,
      userId,
    })
  }
}

export { CreateShotUrlUseCase }
