import { prisma } from '../../../../database/prisma'

class GetMyUrlsUseCase {
  async exec(userId: string) {
    const urls = await prisma.url.findMany({
      where: {
        userId,
      },
    })

    return urls
  }
}

export { GetMyUrlsUseCase }
