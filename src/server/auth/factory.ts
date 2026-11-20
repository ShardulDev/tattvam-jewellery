import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { admin as adminPlugin } from "better-auth/plugins";
import { ADMIN_ROLES, adminAccessControl } from "./permissions";

const GENERIC_LOGIN_FAILURE = "Unable to sign in with those credentials.";

export type AdminAuthEvent =
  | "LOGIN_SUCCEEDED"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "ADMIN_ACCOUNT_CREATED"
  | "ADMIN_ACCOUNT_UPDATED";

export interface AdminAuthAuditEvent {
  event: AdminAuthEvent;
  actorId: string | null;
  targetId?: string | null;
  email?: string | null;
}

export interface AdminAuthFactoryOptions {
  database: NonNullable<BetterAuthOptions["database"]>;
  secret: string;
  baseURL: string;
  loadAccountStatus: (userId: string) => Promise<string | undefined>;
  recordAuditEvent: (event: AdminAuthAuditEvent) => Promise<void>;
  updateLastLogin: (userId: string, at: Date) => Promise<void>;
  allowSignUpForTests?: boolean;
}

export function createAdminAuth(options: AdminAuthFactoryOptions) {
  return betterAuth({
    appName: "Tattvam Jewels Admin",
    baseURL: options.baseURL,
    secret: options.secret,
    trustedOrigins: [options.baseURL],
    database: options.database,
    emailAndPassword: {
      enabled: true,
      disableSignUp: !options.allowSignUpForTests,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
    },
    user: {
      additionalFields: {
        status: {
          type: ["ACTIVE", "INACTIVE"],
          required: true,
          defaultValue: "ACTIVE",
          input: false,
        },
        lastLoginAt: {
          type: "date",
          required: false,
          input: false,
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 12,
      updateAge: 60 * 60,
      cookieCache: { enabled: false },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      modelName: "rateLimit",
      customRules: {
        "/sign-in/email": { window: 5 * 60, max: 5 },
      },
    },
    advanced: {
      useSecureCookies: process.env.NODE_ENV === "production",
      defaultCookieAttributes: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
    plugins: [
      adminPlugin({
        ac: adminAccessControl,
        roles: ADMIN_ROLES,
        adminRoles: ["OWNER"],
        defaultRole: "VIEWER",
      }),
    ],
    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            const status = await options.loadAccountStatus(session.userId);
            if (status !== "ACTIVE") {
              throw new APIError("UNAUTHORIZED", { message: GENERIC_LOGIN_FAILURE });
            }
            return { data: session };
          },
        },
      },
      user: {
        create: {
          after: async (user) => {
            await options.recordAuditEvent({
              event: "ADMIN_ACCOUNT_CREATED",
              actorId: null,
              targetId: user.id,
              email: user.email,
            });
          },
        },
        update: {
          after: async (user, context) => {
            const actorId = context?.context.session?.user.id;
            if (actorId) {
              await options.recordAuditEvent({
                event: "ADMIN_ACCOUNT_UPDATED",
                actorId,
                targetId: user.id,
                email: user.email,
              });
            }
          },
        },
      },
    },
    hooks: {
      after: createAuthMiddleware(async (context) => {
        if (context.path === "/sign-in/email") {
          const session = context.context.newSession;
          const email =
            typeof context.body?.email === "string"
              ? context.body.email.trim().toLowerCase()
              : null;

          await options.recordAuditEvent({
            event: session ? "LOGIN_SUCCEEDED" : "LOGIN_FAILED",
            actorId: session?.user.id ?? null,
            email: session?.user.email ?? email,
          });

          if (session) await options.updateLastLogin(session.user.id, new Date());
        }
      }),
    },
  });
}
