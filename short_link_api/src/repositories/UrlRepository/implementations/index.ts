import { Url } from '@prisma/client'
import { prisma } from '../../../database/prisma'
import { ICreateUrlDTO } from '../../../DTOS/ICreateUrlDTO'
import { IUrlRepository } from '../IUrlRepository'

class UrlRepository implements IUrlRepository {
  async findByShortUrl(shortUrl: string): Promise<Url | null> {
    return await prisma.url.findFirst({
      where: {
        shortUrl,
      },
    })
  }
  async findByUrl(url: string): Promise<Url | null> {
    return await prisma.url.findFirst({
      where: {
        url,
      },
    })
  }
  async create({ url, shortUrl, userId = null }: ICreateUrlDTO): Promise<Url> {
    return await prisma.url.create({
      data: {
        url,
        shortUrl,
        userId,
      },
    })
  }
  async delete(id: string): Promise<void> {
    await prisma.url.delete({
      where: {
        id,
      },
    })
    return
  }
  async findByUserId(userId: string): Promise<Url[]> {
    return await prisma.url.findMany({
      where: {
        userId,
      },
    })
  }
  async findAll(): Promise<Url[]> {
    return await prisma.url.findMany({
      orderBy: {
        visits: 'desc',
      },
    })
  }

  async incrementeVisits(id: string): Promise<void> {
    await prisma.url.update({
      where: {
        id,
      },
      data: {
        visits: {
          increment: 1,
        },
      },
    })
    return
  }
}

export { UrlRepository }
