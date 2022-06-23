import { Url } from '@prisma/client'
import { ICreateUrlDTO } from '../../../../DTOS/ICreateUrlDTO'

interface IUrlRepository {
  findByShortUrl(shortUrl: string): Promise<Url | null>
  findByUrl(url: string): Promise<Url | null>
  create(data: ICreateUrlDTO): Promise<Url>
  delete(id: string): Promise<void>
  findByUserId(userId: string): Promise<Url[]>
  findAll(): Promise<Url[]>
  incrementeVisits(id: string): Promise<void>
}

export { IUrlRepository }
