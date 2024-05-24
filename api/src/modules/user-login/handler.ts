import type { Context } from "hono";
import type { RequestBody } from "./type";

export default async (c: Context) => {
  // Lazy Loading
  // Should help to reduce the bundle size
  const timestamp = (await import("../../utils")).timestamp;
  const model = (await import("./model")).model;

  const reqBody = await c.req.json<RequestBody>();
  try {
    const user = await model.loginEmail(reqBody);
    if (!user) {
      return c.json(
        {
          status: 401,
          timestamp: timestamp(),
          message: "Invalid Credetial",
        },
        401,
      );
    }
    return c.json(
      {
        status: 200,
        timestamp: timestamp(),
        message: "success",
        data: {
          user_uid: user.user_uid,
        },
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        status: 500,
        timestamp: timestamp(),
        message: "Internal server error",
      },
      500,
    );
  }
};
