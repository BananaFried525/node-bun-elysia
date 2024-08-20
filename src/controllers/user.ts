import { Elysia, t } from 'elysia'
import * as userService from '../services/user'

export const userController = (app: Elysia) =>
  app
    .get('/',
      async ({ headers, query }) => {
        return userService.getUser({ reference: query.reference })
      },
      {
        tags: ["User"],
        query: t.Object({
          reference: t.String()
        }),
        headers: t.Object({
          "x-client-id": t.String()
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