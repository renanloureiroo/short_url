import { prisma } from '../../../../database/prisma'

class MeUseCase {
  async exec(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    const userFormatted = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
    }
    return userFormatted
  }
}

export { MeUseCase }
