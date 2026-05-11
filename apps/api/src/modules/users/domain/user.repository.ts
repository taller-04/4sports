import type { User } from './user.entity'

export interface UserRepository {
  findById(id: number): Promise<User | null>
  findAll(): Promise<User[]>
  create(data: Omit<User, 'id'>): Promise<User>
  update(id: number, data: Partial<Omit<User, 'id'>>): Promise<User | null>
  delete(id: number): Promise<boolean>
}
