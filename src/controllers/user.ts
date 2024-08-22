import { Elysia, t } from 'elysia'
import * as userService from '../services/user'
import { jwt } from '@elysiajs/jwt'
import * as AuthTypes from '../types/auth'

export const userController = (app: Elysia) =>
  app
    .use(jwt({
      name: 'jwt',
      alg: "HS256",
      secret: process.env.JWT_SECRET!,
      exp: '15m',
    }))
    .get('/profile',
      async ({ jwt, headers }) => {
        const payload = await jwt.verify(headers.Authorization) as AuthTypes.token
        if (payload.reference) {
          return {
            user_name: payload.reference,
            message: "message"
          }
        } else {
          throw new Error("not_found")
        }
      },
      {
        tags: ["User"],
        headers: t.Object({
          "Authorization": t.String(),
        }),
        response: t.Object({
          user_name: t.String(),
          message: t.String(),
        })
      }
    )
    .post('/register',
      async ({ body }) => {
        return {
          message: "register"
        }
      }, {
      tags: ["User"],
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String()
      }),
      response: t.Object({
        message: t.String()
      })
    },
    )

export default userController