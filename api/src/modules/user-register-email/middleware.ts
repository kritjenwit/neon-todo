import type { Context } from "hono";
import type { RequestBody } from "./type";

export default async (value: RequestBody, c: Context) => {
  if (!value.email || !value.password) {
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
  return value;
};
