import "server-only";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { getServerEnv } from "@/lib/env";
import { createAdminAuth } from "@/server/auth/factory";
import { adminAuthEvents, adminUsers, authSchema } from "@/server/db/schema";
import { createDatabase } from "@/server/db";

let services: ReturnType<typeof createAuthServices> | undefined;

function createAuthServices() {
  const env = getServerEnv();
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for admin authentication.");
  }
  if (!env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is required for admin authentication.");
  }

  const database = createDatabase();
  const baseURL = env.BETTER_AUTH_URL ?? "http://127.0.0.1:3100";
  const auth = createAdminAuth({
    database: drizzleAdapter(database, {
      provider: "pg",
      schema: authSchema,
      transaction: true,
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL,
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

  return { auth, database };
}

export function getAuthServices() {
  services ??= createAuthServices();
  return services;
}
