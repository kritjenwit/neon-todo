import type { Context } from "hono";
import type { RequestBody } from "./type";

export default async (c: Context) => {
  // Lazy Loading
  // Should help to reduce the bundle size
  const timestamp = (await import("../../../utils")).timestamp;
  const { validate } = (await import("./model")).model;

  const { project_uuid } = c.req.query() as RequestBody;
  try {
    const user = await validate({ project_uuid });
    if (!user) {
      return c.json(
        {
          status: 401,
          timestamp: timestamp(),
          message: "User not found",
        },
        401,
      );
    }
    return c.json(
      {
        status: 200,
        timestamp: timestamp(),
        message: "success",
        data: user,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        status: 401,
        timestamp: timestamp(),
        message: "User not found",
      },
      401,
    );
  }
};
