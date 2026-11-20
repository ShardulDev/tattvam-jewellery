import { createAccessControl } from "better-auth/plugins/access";

export const ADMIN_PERMISSION_STATEMENT = {
  dashboard: ["view"],
  profile: ["view"],
  administrators: ["read", "manage"],
} as const;

export const adminAccessControl = createAccessControl(ADMIN_PERMISSION_STATEMENT);

export const ADMIN_ROLES = {
  OWNER: adminAccessControl.newRole({
    dashboard: ["view"],
    profile: ["view"],
    administrators: ["read", "manage"],
  }),
  ADMIN: adminAccessControl.newRole({
    dashboard: ["view"],
    profile: ["view"],
    administrators: ["read"],
  }),
  OPERATIONS: adminAccessControl.newRole({
    dashboard: ["view"],
    profile: ["view"],
  }),
  VIEWER: adminAccessControl.newRole({
    dashboard: ["view"],
    profile: ["view"],
  }),
} as const;

export type AdminRole = keyof typeof ADMIN_ROLES;
export type AdminPermission = {
  [Resource in keyof typeof ADMIN_PERMISSION_STATEMENT]: {
    resource: Resource;
    action: (typeof ADMIN_PERMISSION_STATEMENT)[Resource][number];
  };
}[keyof typeof ADMIN_PERMISSION_STATEMENT];

const ROLE_PERMISSION_MAP: Record<
  AdminRole,
  Partial<Record<keyof typeof ADMIN_PERMISSION_STATEMENT, readonly string[]>>
> = {
  OWNER: {
    dashboard: ["view"],
    profile: ["view"],
    administrators: ["read", "manage"],
  },
  ADMIN: {
    dashboard: ["view"],
    profile: ["view"],
    administrators: ["read"],
  },
  OPERATIONS: {
    dashboard: ["view"],
    profile: ["view"],
  },
  VIEWER: {
    dashboard: ["view"],
    profile: ["view"],
  },
} as const;

export function isAdminRole(role: string): role is AdminRole {
  return Object.hasOwn(ROLE_PERMISSION_MAP, role);
}

export function hasAdminPermission(role: string, permission: AdminPermission): boolean {
  if (!isAdminRole(role)) return false;

  const actions = ROLE_PERMISSION_MAP[role][permission.resource] as
    readonly string[] | undefined;

  return actions?.includes(permission.action) ?? false;
}

export const ADMIN_PERMISSIONS = {
  dashboardView: { resource: "dashboard", action: "view" },
  profileView: { resource: "profile", action: "view" },
  administratorsRead: { resource: "administrators", action: "read" },
  administratorsManage: { resource: "administrators", action: "manage" },
} as const satisfies Record<string, AdminPermission>;
