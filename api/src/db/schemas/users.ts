import {
  index,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { auditTemplate } from "./auditTemplate";

export const loginTypeEnum = pgEnum("login_type", [
  "EMAIL",
  "FACEBOOK",
  "GOOGLE",
  "TWITTER",
  "LINKEDIN",
  "GITHUB",
]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    user_uid: uuid("user_uid").defaultRandom().unique(),
    email: varchar("email", {
      length: 50,
    }).notNull(),
    password: varchar("password", {
      length: 100,
    }),
    first_name: varchar("first_name", { length: 50 }),
    last_name: varchar("last_name", { length: 50 }),
    img_url: varchar("img_url", { length: 255 }),
    login_type: loginTypeEnum("login_type"),
    ...auditTemplate,
  },
  (table) => {
    return {
      emailLoginTypeIndex: uniqueIndex().on(table.email, table.login_type),
      loginTypeIndex: index().on(table.login_type),
      isDeletedIndex: index().on(table.is_deleted),
    };
  },
);
