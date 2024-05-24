import { boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const auditTemplate = {
  is_deleted: boolean("is_deleted").default(false),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  created_by: varchar("created_by", { length: 32 }).notNull(),
  updated_by: varchar("updated_by", { length: 32 }).notNull(),
  deleted_by: varchar("deleted_by", { length: 32 }),
};
