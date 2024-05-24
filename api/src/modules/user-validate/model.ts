import { db } from "../../db";
import type { RequestBody } from "./type";

export const model = {
  async validate(body: RequestBody) {
    const { user_uid } = body;
    try {
      const user = await db.query.users.findFirst({
        columns: {
          user_uid: true,
        },
        where: (user, { eq }) => {
          return eq(user.user_uid, user_uid);
        },
      });
      return user;
    } catch (e) {
      throw new Error("Internal server error");
    }
  },
};
