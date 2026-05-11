import type { User } from '../../domain/user.entity'
import type { UserRepository } from '../../domain/user.repository'

export class ListUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepo.findAll()
  }
}
