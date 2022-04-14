import { prisma } from '../../../../database/prisma'

class RedirectUrlUseCase {
  async exec(shortUrl: string) {
    const link = await prisma.url.findFirst({
      where: {
        shortUrl,
      },
    })
    // if (!link) {
    //   throw new AppError('Url does not exist')
    // }

    return link
  }
}

export { RedirectUrlUseCase }
