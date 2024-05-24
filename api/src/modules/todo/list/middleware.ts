import type { Context } from "hono";
import type { RequestBody } from "./type";

export default async (_: RequestBody, c: Context) => {
  const value = c.req.query() as RequestBody;

  // Lazy Loading
  // Should help to reduce the bundle size
  const timestamp = (await import("../../../utils")).timestamp;
  if (!value.project_uuid) {
    return c.json(
      {
        status: 400,
        timestamp: timestamp(),
        message: "Invalid Request body",
      },
      400,
    );
  }
  if (value.project_uuid.length !== 36) {
    return c.json({
      status: 401,
      timestamp: timestamp(),
      message: "Invalid Request body",
    });
  }
  return value;
};
