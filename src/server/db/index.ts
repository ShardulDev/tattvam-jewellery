import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getServerEnv } from "@/lib/env";

export function createDatabase() {
  const { DATABASE_URL } = getServerEnv();

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required to connect to PostgreSQL.");
  }

  const client = postgres(DATABASE_URL, { prepare: false });
  return drizzle(client);
}
