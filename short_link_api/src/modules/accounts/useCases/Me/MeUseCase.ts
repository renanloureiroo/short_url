import { injectable, inject } from 'tsyringe'
import { IUserRepository } from '../../repositories/UserRepository/IUserRepository'

@injectable()
class MeUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async exec(id: string) {
    const user = await this.userRepository.findById(id)

    const userFormatted = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
    }
    return userFormatted
  }
}

export { MeUseCase }
