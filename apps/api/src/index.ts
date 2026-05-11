import { Elysia } from 'elysia'
import { userRoutes } from './modules/users/api/user.routes'

const app = new Elysia()
  .use(userRoutes)
  .get('/', () => 'Hello Elysia')
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
