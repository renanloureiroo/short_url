import { Url } from '@prisma/client'
import { ICreateUrlDTO } from '../../DTOS/createUrl'

interface IUrlRepository {
  findByShortUrl(shortUrl: string): Promise<Url | null>
  findByUrl(url: string): Promise<Url | null>
  create(data: ICreateUrlDTO): Promise<Url>
  delete(id: string): Promise<void>
  findByUserId(userId: string): Promise<Url[]>
  findAll(): Promise<Url[]>
}

export { IUrlRepository }
