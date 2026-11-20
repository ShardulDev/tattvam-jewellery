import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { eq } from "drizzle-orm";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { createAdminAuth } from "@/server/auth/factory";
import { hasAdminPermission, ADMIN_PERMISSIONS } from "@/server/auth/permissions";
import { isPublicAuthEndpoint } from "@/server/auth/route-policy";
import { recordLogoutAudit } from "@/server/auth/logout-audit";
import { adminAuthEvents, adminUsers, authSchema } from "@/server/db/schema";

const instances: PGlite[] = [];

afterEach(async () => {
  await Promise.all(instances.splice(0).map((database) => database.close()));
});

describe("administrator authentication", () => {
  it("supports sign-in, rejects invalid and inactive accounts, validates sessions, and revokes on logout", async () => {
    const pg = new PGlite();
    instances.push(pg);
    const migration = await readFile("drizzle/0000_ambiguous_next_avengers.sql", "utf8");
    for (const statement of migration.split("--> statement-breakpoint")) {
      if (statement.trim()) await pg.exec(statement);
    }
    const db = drizzle(pg, { schema: authSchema });
    const audit: string[] = [];
    const testAuth = createAdminAuth({
      database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema,
        transaction: false,
      }),
      secret: "a-test-secret-that-is-at-least-thirty-two-characters-long",
      baseURL: "http://localhost:3100",
      allowSignUpForTests: true,
      loadAccountStatus: async (id) => {
        const [user] = await db
          .select({ status: adminUsers.status })
          .from(adminUsers)
          .where(eq(adminUsers.id, id));
        return user?.status;
      },
      updateLastLogin: async (id, at) => {
        await db
          .update(adminUsers)
          .set({ lastLoginAt: at.toISOString() })
          .where(eq(adminUsers.id, id));
      },
      recordAuditEvent: async (event) => {
        audit.push(event.event);
        await db.insert(adminAuthEvents).values({
          id: crypto.randomUUID(),
          event: event.event,
          actorId: event.actorId,
          targetId: event.targetId ?? null,
          email: event.email ?? null,
        });
      },
    });
    const endpoint = (path: string, method: string, body?: object, cookie?: string) =>
      testAuth.handler(
        new Request(`http://localhost:3100/api/auth/${path}`, {
          method,
          headers: {
            ...(body
              ? { "content-type": "application/json", origin: "http://localhost:3100" }
              : {}),
            ...(cookie ? { cookie } : {}),
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
        }),
      );

    const created = await endpoint("sign-up/email", "POST", {
      name: "Test Owner",
      email: "owner@example.test",
      password: "Strong-test-password-123",
    });
    expect(created.status).toBe(200);
    const [owner] = await db
      .select({ id: adminUsers.id })
      .from(adminUsers)
      .where(eq(adminUsers.email, "owner@example.test"));
    expect(owner).toBeTruthy();
    await db
      .update(adminUsers)
      .set({ role: "OWNER" })
      .where(eq(adminUsers.id, owner!.id));

    const bad = await endpoint("sign-in/email", "POST", {
      email: "owner@example.test",
      password: "incorrect-password",
    });
    expect(bad.status).toBeGreaterThanOrEqual(400);
    expect(await bad.text()).not.toContain("owner@example.test");

    const login = await endpoint("sign-in/email", "POST", {
      email: "owner@example.test",
      password: "Strong-test-password-123",
    });
    expect(login.status).toBe(200);
    const cookie = login.headers.get("set-cookie");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
    const cookiePair = cookie!.split(";")[0]!;

    const session = await endpoint("get-session", "GET", undefined, cookiePair);
    expect(session.status).toBe(200);
    expect(await session.json()).toMatchObject({ user: { email: "owner@example.test" } });

    await recordLogoutAudit(
      new Headers({ cookie: cookiePair }),
      async (headers) => testAuth.api.getSession({ headers }),
      async (userId) => {
        audit.push("LOGOUT");
        await db
          .insert(adminAuthEvents)
          .values({ id: crypto.randomUUID(), event: "LOGOUT", actorId: userId });
      },
    );
    const logout = await endpoint("sign-out", "POST", {}, cookiePair);
    expect(logout.status).toBe(200);
    const expired = await endpoint("get-session", "GET", undefined, cookiePair);
    expect(await expired.json()).toBeNull();

    await db
      .update(adminUsers)
      .set({ status: "INACTIVE" })
      .where(eq(adminUsers.id, owner!.id));
    const sessionsBefore = await db.select().from(authSchema.session);
    const inactive = await endpoint("sign-in/email", "POST", {
      email: "owner@example.test",
      password: "Strong-test-password-123",
    });
    expect(inactive.status).toBeGreaterThanOrEqual(400);
    const sessionsAfter = await db.select().from(authSchema.session);
    expect(sessionsAfter).toHaveLength(sessionsBefore.length);

    expect(audit).toContain("LOGIN_SUCCEEDED");
    expect(audit).toContain("LOGIN_FAILED");
    expect(audit).toContain("LOGOUT");
  }, 30_000);

  it("denies registration and privileged auth endpoints through the public route policy", () => {
    expect(isPublicAuthEndpoint("POST", "/api/auth/sign-in/email")).toBe(true);
    expect(isPublicAuthEndpoint("POST", "/api/auth/sign-up/email")).toBe(false);
    expect(isPublicAuthEndpoint("POST", "/api/auth/create-user")).toBe(false);
    expect(isPublicAuthEndpoint("POST", "/api/auth/set-role")).toBe(false);
  });

  it("applies role permissions and owner-only administrator management", () => {
    expect(hasAdminPermission("OWNER", ADMIN_PERMISSIONS.administratorsManage)).toBe(
      true,
    );
    expect(hasAdminPermission("ADMIN", ADMIN_PERMISSIONS.administratorsRead)).toBe(true);
    expect(hasAdminPermission("ADMIN", ADMIN_PERMISSIONS.administratorsManage)).toBe(
      false,
    );
    expect(hasAdminPermission("OPERATIONS", ADMIN_PERMISSIONS.dashboardView)).toBe(true);
    expect(hasAdminPermission("VIEWER", ADMIN_PERMISSIONS.administratorsRead)).toBe(
      false,
    );
    expect(hasAdminPermission("BROWSER", ADMIN_PERMISSIONS.dashboardView)).toBe(false);
  });
});
