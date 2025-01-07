import type { Config } from "drizzle-kit";
import { env } from "~/configs/env";

export default {
  schema: "./src/server/db/schemas.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  introspect: { casing: "camel" },
  out: "drizzle",
  verbose: true,
  strict: true,
} satisfies Config;
