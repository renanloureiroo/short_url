import { prisma } from '../../../../database/prisma'

class DeleteLinkUseCase {
  async exec(id: string): Promise<void> {
    await prisma.url.delete({
      where: {
        id,
      },
    })
  }
}

export { DeleteLinkUseCase }
