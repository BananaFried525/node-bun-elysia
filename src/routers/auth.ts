import { Elysia, t, } from 'elysia'
import { dayjs } from '../utils'
import { jwt } from '@elysiajs/jwt'
import * as AuthTypes from '../types/auth'

export const authRouter = (app: Elysia) =>
  app
    .use(jwt({
      name: 'jwt',
      alg: "HS256",
      secret: process.env.JWT_SECRET!,
      exp: '15m',
    }))
    .group('/auth', (app) =>
      app.post('/sign', async ({ jwt, body, headers }) => {
        if (headers['x-client-id'] === process.env.ALLOW_CLIENT_ID) {

          const payload: AuthTypes.token = {
            reference: "test1",
            scope: "system_admin",
            exp: dayjs().add(15, 'minutes').unix()
          }
          return {
            message: "success",
            token: await jwt.sign(payload),
            expires_at: dayjs().add(15, 'minutes').toISOString()
          }
        } else {
          throw new Error("client_id is not allowed")
        }
      },
        {
          body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String()
          }),
          headers: t.Object({
            "x-client-id": t.String()
          }),
          response: t.Object({
            message: t.String(),
            token: t.String(),
            expires_at: t.String({ format: 'date-time' })
          }),
          tags: ["Auth"],
        }
      )
    )

export default authRouter