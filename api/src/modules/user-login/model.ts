import { db } from "../../db";

export const model = {
  async loginEmail(body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const user = await db.query.users.findFirst({
        columns: {
          user_uid: true,
          email: true,
          password: true,
        },
        where: (user, { eq, and }) => {
          return and(eq(user.email, email), eq(user.login_type, "EMAIL"));
        },
      });
      if (!user) {
        return undefined;
      }

      if (user.password !== password) {
        return undefined;
      }

      return user;
    } catch (e) {
      throw new Error("Internal server error");
    }
  },
};
