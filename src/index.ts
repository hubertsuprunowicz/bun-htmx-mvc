import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import {
  ProductController,
  CartController,
  ErrorController,
} from "./controllers";

const app = new Elysia()
  .onError(({ code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return ErrorController.notFound();
    }
  })
  .get("/", () => ProductController.index())
  .get("/product/:id", ({ params: { id } }) => ProductController.get(id))
  .post("/cart/:id", ({ params: { id } }) => CartController.add(id))
  .use(staticPlugin())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
