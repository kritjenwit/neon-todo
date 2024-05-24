import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { auditTemplate } from "./auditTemplate";
import { users } from "./users";

export const workspaces = pgTable(
  "workspaces",
  {
    id: serial("id").primaryKey(),
    workspace_uuid: uuid("workspace_uuid").defaultRandom().unique(),
    user_id: integer("user_id")
      .references(() => users.id)
      .notNull()
      .unique(),
    name: varchar("name", { length: 100 }),
    description: varchar("description", { length: 255 }),
    ...auditTemplate,
  },
  (table) => {
    return {
      isDeletedIndex: index().on(table.is_deleted),
    };
  },
);

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    workspace_id: integer("workspace_id")
      .references(() => workspaces.id)
      .notNull()
      .unique(),
    user_id: integer("user_id")
      .references(() => users.id)
      .notNull()
      .unique(),
    project_uuid: uuid("project_uuid").defaultRandom().unique(),
    name: varchar("name", { length: 100 }),
    description: varchar("description", { length: 255 }),
    is_archived: boolean("is_archived").default(false),
    ...auditTemplate,
  },
  (table) => {
    return {
      isDeletedIndex: index().on(table.is_deleted),
      isArchivedIndex: index().on(table.is_archived),
    };
  },
);

export const todoProps = pgTable(
  "todos_props",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id")
      .references(() => projects.id)
      .notNull()
      .unique(),
    user_id: integer("user_id")
      .references(() => users.id)
      .notNull()
      .unique(),
    todo_props_uuid: uuid("todo_props_uuid").defaultRandom().unique(),
    start_date: date("start_date").defaultNow(),
    end_date: date("end_date"),
    is_completed: boolean("is_completed").default(false),
    ...auditTemplate,
  },
  (table) => {
    return {
      isDeletedIndex: index().on(table.is_deleted),
    };
  },
);

export const todos = pgTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id")
      .references(() => projects.id)
      .notNull()
      .unique(),
    todo_uuid: uuid("todo_uuid").defaultRandom().unique(),
    todo_props_id: integer("todo_props_id")
      .references(() => todoProps.id)
      .notNull()
      .unique(),
    ...auditTemplate,
  },
  (table) => {
    return {
      isDeletedIndex: index().on(table.is_deleted),
    };
  },
);

export const subTodos = pgTable(
  "sub_todos",
  {
    id: serial("id").primaryKey(),
    todo_id: integer("todo_id")
      .references(() => todos.id)
      .notNull()
      .unique(),
    sub_todo_uuid: uuid("sub_todo_uuid").defaultRandom().unique(),
    todo_props_id: integer("todo_props_id")
      .references(() => todoProps.id)
      .notNull()
      .unique(),
    ...auditTemplate,
  },
  (table) => {
    return {
      isDeletedIndex: index().on(table.is_deleted),
    };
  },
);
