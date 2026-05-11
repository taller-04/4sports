import { eq } from 'drizzle-orm'
import db from '../../../config/db'
import { usersSchema } from '../../../config/db/schemas/users'
import type { User } from '../domain/user.entity'
import type { UserRepository } from '../domain/user.repository'
import { UserMapper } from './user.mapper'

export class UserDrizzleRepository implements UserRepository {
  async findById(id: number): Promise<User | null> {
    const rows = await db.select().from(usersSchema).where(eq(usersSchema.id, id))
    const row = rows[0]
    return row ? UserMapper.toDomain(row) : null
  }

  async findAll(): Promise<User[]> {
    const rows = await db.select().from(usersSchema)
    return rows.map(UserMapper.toDomain)
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const [row] = await db.insert(usersSchema).values(UserMapper.toDB(data)).returning()
    // row is guaranteed by .returning() after a successful insert
    // biome-ignore lint/style/noNonNullAssertion: insert always returns the created row
    return UserMapper.toDomain(row!)
  }

  async update(id: number, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const rows = await db.update(usersSchema).set(data).where(eq(usersSchema.id, id)).returning()
    const row = rows[0]
    return row ? UserMapper.toDomain(row) : null
  }

  async delete(id: number): Promise<boolean> {
    const rows = await db.delete(usersSchema).where(eq(usersSchema.id, id)).returning()
    return rows.length > 0
  }
}
