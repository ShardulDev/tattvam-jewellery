import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { createAdminAuth } from "./factory";
import { adminAuthEvents, adminUsers, authSchema } from "../db/schema";

const env = z
  .object({
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url().optional(),
  })
  .parse(process.env);
const client = postgres(env.DATABASE_URL, { prepare: false });
const database = drizzle(client, { schema: authSchema });

export const auth = createAdminAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: authSchema,
    transaction: true,
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL ?? "http://127.0.0.1:3100",
  loadAccountStatus: async (userId) => {
    const [user] = await database
      .select({ status: adminUsers.status })
      .from(adminUsers)
      .where(eq(adminUsers.id, userId))
      .limit(1);
    return user?.status;
  },
  updateLastLogin: async (userId, at) => {
    await database
      .update(adminUsers)
      .set({ lastLoginAt: at.toISOString() })
      .where(eq(adminUsers.id, userId));
  },
  recordAuditEvent: async (event) => {
    await database.insert(adminAuthEvents).values({
      id: crypto.randomUUID(),
      event: event.event,
      actorId: event.actorId,
      targetId: event.targetId ?? null,
      email: event.email ?? null,
    });
  },
});
