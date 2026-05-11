import type { User } from '../../domain/user.entity'
import type { UserRepository } from '../../domain/user.repository'

export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(id: number): Promise<User | null> {
    return this.userRepo.findById(id)
  }
}
