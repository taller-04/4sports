import type { UserRepository } from '../../domain/user.repository'

export class DeleteUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(id: number): Promise<boolean> {
    return this.userRepo.delete(id)
  }
}
