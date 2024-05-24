import type { Context } from "hono";
import type { RequestBody } from "./type";

export default async (_: RequestBody, c: Context) => {
  const value = c.req.query() as RequestBody;
  if (!value.user_uid) {
    // Lazy Loading
    // Should help to reduce the bundle size
    const timestamp = (await import("../../utils")).timestamp;

    return c.json(
      {
        status: 400,
        timestamp: timestamp(),
        message: "Invalid Request body",
      },
      400,
    );
  }
  if (value.user_uid.length !== 36) {
    // Lazy Loading
    // Should help to reduce the bundle size
    const timestamp = (await import("../../utils")).timestamp;

    return c.json({
      status: 401,
      timestamp: timestamp(),
      message: "Invalid Request body",
    });
  }
  return value;
};
