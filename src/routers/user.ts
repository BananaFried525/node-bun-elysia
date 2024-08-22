import { Elysia, t } from 'elysia'
import { userController } from '../controllers/user'

export const userRouter = (app: Elysia) =>
  app.group('/user', (app) =>
    app.use(userController)
  )

export default userRouter