// migrate.ts
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "~/configs/env";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
const db: PostgresJsDatabase = drizzle(migrationClient);

const main = async () => {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: "drizzle" });
  await migrationClient.end();
  console.log("Database migrated successfully!");
};

main();
