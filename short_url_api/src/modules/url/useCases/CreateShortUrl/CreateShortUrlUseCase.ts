import { nanoid } from 'nanoid'
import validator from 'validator'
import { prisma } from '../../../../database/prisma'
import { AppError } from '../../../../errors/AppError'

interface CreateShortUrlParams {
  url: string
  userId?: string
}

class CreateShotUrlUseCase {
  async exec({ url, userId }: CreateShortUrlParams) {
    const urlValid = validator.isURL(url)
    if (!urlValid) throw new AppError('Url invalid')

    const urlAlreadyExits = await prisma.url.findFirst({
      where: {
        url,
      },
    })
    if (urlAlreadyExits) {
      return urlAlreadyExits
    }

    const newShortUrl = nanoid(6)

    if (!userId) {
      const newUrl = prisma.url.create({
        data: { url, shortUrl: newShortUrl },
      })
      return newUrl
    } else {
      const newUrl = prisma.url.create({
        data: { url, shortUrl: newShortUrl, userId },
      })
      return newUrl
    }
  }
}

export { CreateShotUrlUseCase }
