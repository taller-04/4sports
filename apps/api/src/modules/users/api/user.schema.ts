import { z } from 'zod'

export const createUserInput = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  preferences: z
    .object({
      sport: z.string().optional(),
      notifications: z.boolean().optional(),
    })
    .optional(),
})

export const updateUserInput = createUserInput.partial()

export const userResponse = z.object({
  id: z.number(),
  name: z.string(),
  bio: z.string().nullable(),
  preferences: z
    .object({
      sport: z.string().optional(),
      notifications: z.boolean().optional(),
    })
    .nullable(),
})

export type CreateUserInput = z.infer<typeof createUserInput>
export type UpdateUserInput = z.infer<typeof updateUserInput>
export type UserResponse = z.infer<typeof userResponse>
