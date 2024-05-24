import { db } from "../../db";
import { users as userSchema } from "../../db/schemas";
import { genPlaceholderUrl } from "../../utils";
import type { RequestBody } from "./type";

export const model = {
  async register(body: RequestBody) {
    const LOGIN_TYPE = "EMAIL";
    const { email, password } = body;
    try {
      const user = await db.query.users.findFirst({
        columns: {
          email: true,
        },
        where: (user, { eq, and }) => {
          return and(eq(user.email, email), eq(user.login_type, LOGIN_TYPE));
        },
      });
      if (user) {
        return false;
      }

      try {
        await db.transaction(async (tx) => {
          await tx.insert(userSchema).values({
            email,
            password,
            login_type: LOGIN_TYPE,
            first_name: body.first_name,
            last_name: body.last_name,
            img_url: genPlaceholderUrl(body.first_name, body.last_name),
            created_by: "SYSTEM",
            updated_by: "SYSTEM",
          });
        });
      } catch (e) {
        console.error("A", e);
        throw new Error("Internal server error");
      }

      return await db.query.users.findFirst({
        columns: {
          user_uid: true,
        },
        where: (user, { eq, and }) => {
          return and(eq(user.email, email), eq(user.login_type, LOGIN_TYPE));
        },
      });
    } catch (e) {
      console.error("B", e);
      throw new Error("Internal server error");
    }
  },
};
