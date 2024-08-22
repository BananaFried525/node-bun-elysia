import { Elysia, } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { userRouter, authRouter } from "./routers";
import { cors } from "@elysiajs/cors";
import { jwt } from '@elysiajs/jwt';

const app = new Elysia({ prefix: "/api/v1" })
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: process.env.SERVICE_NAME || "Elysia",
          version: process.env.SERVICE_VERSION || "1.0.0",
        },
        tags: [
          {
            name: "User",
            description: "User management",
          },
        ],
      },
    })
  )
  .use(authRouter)
  .use(userRouter)
  .listen(process.env.SERVICE_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
