import { prisma } from '../../../../database/prisma'

class RedirectUrlUseCase {
  async exec(shortUrl: string) {
    const link = await prisma.url.findFirst({
      where: {
        shortUrl,
      },
    })
    if (link) {
      await prisma.url.update({
        where: { id: link.id },
        data: {
          visits: {
            increment: 1,
          },
        },
      })
    }
    return link
  }
}

export { RedirectUrlUseCase }
