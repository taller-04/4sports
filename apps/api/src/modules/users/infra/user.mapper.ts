import type { usersSchema } from '../../../config/db/schemas/users'
import { User, type UserPreferences } from '../domain/user.entity'

type UserRow = typeof usersSchema.$inferSelect
type NewUserRow = typeof usersSchema.$inferInsert

export const UserMapper = {
  toDomain(row: UserRow): User {
    return new User(row.id, row.name, row.bio ?? null, (row.preferences as UserPreferences) ?? null)
  },

  toDB(data: Omit<User, 'id'>): Omit<NewUserRow, 'id'> {
    return {
      name: data.name,
      bio: data.bio,
      preferences: data.preferences,
    }
  },
}
