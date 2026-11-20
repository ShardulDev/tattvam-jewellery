import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const adminUsers = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    role: text("role").notNull().default("VIEWER"),
    status: text("status").notNull().default("ACTIVE"),
    lastLoginAt: timestamp("lastLoginAt", { withTimezone: true, mode: "string" }),
    banned: boolean("banned").notNull().default(false),
    banReason: text("banReason"),
    banExpires: timestamp("banExpires", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    uniqueIndex("user_single_owner_idx")
      .on(table.role)
      .where(sql`${table.role} = 'OWNER'`),
  ],
);

export const adminSessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt", { withTimezone: true, mode: "string" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonatedBy"),
});

export const adminAccounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt", {
    withTimezone: true,
    mode: "string",
  }),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", {
    withTimezone: true,
    mode: "string",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const adminVerifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true, mode: "string" }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const authRateLimits = pgTable("rateLimit", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  count: integer("count").notNull(),
  lastRequest: timestamp("lastRequest", { withTimezone: true, mode: "string" }).notNull(),
});

export const adminAuthEvents = pgTable("admin_auth_events", {
  id: text("id").primaryKey(),
  event: text("event").notNull(),
  actorId: text("actor_id").references(() => adminUsers.id, { onDelete: "set null" }),
  targetId: text("target_id").references(() => adminUsers.id, { onDelete: "set null" }),
  email: text("email"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const authSchema = {
  user: adminUsers,
  session: adminSessions,
  account: adminAccounts,
  verification: adminVerifications,
  rateLimit: authRateLimits,
};
