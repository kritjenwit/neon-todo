import type { Config } from "drizzle-kit";
import { dbConfig } from "./src/configs";

export default {
  schema: ["./src/db/schemas/users.ts", "./src/db/schemas/todos.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env["DB_HOST"] || dbConfig.host,
    user: process.env["DB_USER"] || dbConfig.username,
    password: process.env["DB_PASSWORD"] || dbConfig.password,
    database: process.env["DB_NAME"] || dbConfig.database,
    port: Number(process.env["DB_PORT"]) || dbConfig.port,
  },
} satisfies Config;
