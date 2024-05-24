import type { Context } from "hono";
import type { RequestBody } from "./type";

export default async (value: RequestBody, c: Context) => {
  if (!value.email || !value.password) {
    const timestamp = (await import("../../utils")).timestamp;

    return c.json(
      {
        status: 400,
        timestamp: timestamp(),
        message: "Email and password are required",
      },
      400,
    );
  }
  return value;
};
