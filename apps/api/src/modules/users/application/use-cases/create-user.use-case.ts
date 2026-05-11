import type { User } from '../../domain/user.entity'
import type { UserRepository } from '../../domain/user.repository'

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(data: Omit<User, 'id'>): Promise<User> {
    return this.userRepo.create(data)
  }
}
