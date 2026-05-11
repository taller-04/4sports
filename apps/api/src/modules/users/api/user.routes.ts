import { Elysia, t } from 'elysia'
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case'
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case'
import { GetUserUseCase } from '../application/use-cases/get-user.use-case'
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case'
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case'
import { UserDrizzleRepository } from '../infra/user.drizzle-repo'

const userRepo = new UserDrizzleRepository()

const preferencesBody = t.Object({
  sport: t.Optional(t.String()),
  notifications: t.Optional(t.Boolean()),
})

const createBody = t.Object({
  name: t.String({ minLength: 1 }),
  bio: t.Optional(t.String()),
  preferences: t.Optional(preferencesBody),
})

const updateBody = t.Object({
  name: t.Optional(t.String({ minLength: 1 })),
  bio: t.Optional(t.Nullable(t.String())),
  preferences: t.Optional(t.Nullable(preferencesBody)),
})

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', () => {
    const useCase = new ListUsersUseCase(userRepo)
    return useCase.execute()
  })
  .get('/:id', async ({ params, status }) => {
    const useCase = new GetUserUseCase(userRepo)
    const user = await useCase.execute(Number(params.id))
    if (!user) return status(404, { message: 'User not found' })
    return user
  })
  .post(
    '/',
    ({ body }) => {
      const useCase = new CreateUserUseCase(userRepo)
      return useCase.execute({
        name: body.name,
        bio: body.bio ?? null,
        preferences: body.preferences ?? null,
      })
    },
    { body: createBody },
  )
  .put(
    '/:id',
    async ({ params, body, status }) => {
      const updateData = {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.bio !== undefined && { bio: body.bio }),
        ...(body.preferences !== undefined && { preferences: body.preferences }),
      }

      const useCase = new UpdateUserUseCase(userRepo)
      const user = await useCase.execute(Number(params.id), updateData)
      if (!user) return status(404, { message: 'User not found' })
      return user
    },
    { body: updateBody },
  )
  .delete('/:id', async ({ params, status }) => {
    const useCase = new DeleteUserUseCase(userRepo)
    const deleted = await useCase.execute(Number(params.id))
    if (!deleted) return status(404, { message: 'User not found' })
    return { deleted: true }
  })
