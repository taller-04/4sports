import { integer, json, pgTable, text } from 'drizzle-orm/pg-core'

export const usersSchema = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  bio: text(),
  preferences: json(),
})
