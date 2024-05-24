import { Hono } from "hono";
import { validator } from "hono/validator";
import { modules } from "./src/modules";

const app = new Hono();

app.post(
  "/user/login",
  validator("json", modules.user.login.middleware),
  modules.user.login.handler
);

app.post(
  "/user/register/email",
  validator("json", modules.user.register.email.middleware),
  modules.user.register.email.handler
);

app.get(
  "/user/validate",
  validator("param", modules.user.validate.middleware),
  modules.user.validate.handler
);

app.get(
  "/todo/list",
  validator("param", modules.todos.list.middleware),
  modules.todos.list.handler
);

export default app;
