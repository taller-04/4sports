import type { User } from '../../domain/user.entity'
import type { UserRepository } from '../../domain/user.repository'

export class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(id: number, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    return this.userRepo.update(id, data)
  }
}
