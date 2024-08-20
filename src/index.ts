import { Elysia,} from "elysia";
import { swagger } from "@elysiajs/swagger";
import { userRouter } from "./routers/user";
import { cors } from "@elysiajs/cors";

const app = new Elysia({prefix: "/api/v1"})
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
  .use(userRouter)
  .listen(process.env.SERVICE_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
