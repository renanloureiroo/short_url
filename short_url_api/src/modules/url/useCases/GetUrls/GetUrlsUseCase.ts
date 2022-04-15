import { prisma } from '../../../../database/prisma'

interface GetUrlsParams {
  page?: string
  limit?: string
}

class GetUrlsUseCase {
  async exec({ page = '1', limit = '5' }: GetUrlsParams) {
    const links = await prisma.url.findMany()

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
