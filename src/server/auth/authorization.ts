import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  ADMIN_PERMISSIONS,
  type AdminPermission,
  hasAdminPermission,
} from "@/server/auth/permissions";
import { getAuthServices } from "@/server/auth";
import { adminUsers } from "@/server/db/schema";

export async function getAdminSession() {
  const { auth, database } = getAuthServices();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const [user] = await database
    .select({ role: adminUsers.role, status: adminUsers.status })
    .from(adminUsers)
    .where(eq(adminUsers.id, session.user.id))
    .limit(1);

  if (!user || user.status !== "ACTIVE") return null;
  return { ...session, user: { ...session.user, role: user.role } };
}

export async function requireAdminPermission(permission: AdminPermission) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (!hasAdminPermission(session.user.role, permission)) redirect("/admin");
  return session;
}

export const dashboardPermission = ADMIN_PERMISSIONS.dashboardView;
