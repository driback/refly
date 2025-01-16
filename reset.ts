import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { reset } from "drizzle-seed";
import postgres from "postgres";
import { env } from "~/configs/env";
import * as schema from "./src/server/db/schemas";

async function main() {
  const client = postgres(env.DATABASE_URL, {
    max: 1,
    timeout: 5000,
  });

  try {
    const db: PostgresJsDatabase = drizzle(client);
    console.log("Starting database reset...");

    await reset(db, schema);
    await client.end();

    console.log("Database reset completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to reset database:", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
