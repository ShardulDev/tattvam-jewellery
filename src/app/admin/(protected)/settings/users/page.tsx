import { requireAdminPermission } from "@/server/auth/authorization";
import { ADMIN_PERMISSIONS } from "@/server/auth/permissions";
import { getAuthServices } from "@/server/auth";
import { adminUsers } from "@/server/db/schema";

export default async function AdminUsersPage() {
  await requireAdminPermission(ADMIN_PERMISSIONS.administratorsRead);
  const { database } = getAuthServices();
  const users = await database
    .select({
      id: adminUsers.id,
      name: adminUsers.name,
      email: adminUsers.email,
      role: adminUsers.role,
      status: adminUsers.status,
      createdAt: adminUsers.createdAt,
    })
    .from(adminUsers)
    .orderBy(adminUsers.createdAt);
  return (
    <>
      <div className="mb-7">
        <p className="text-sm text-stone-500">Admin / Settings / Administrators</p>
        <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl">
          Administrator accounts
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Account creation and role changes are unavailable in this phase.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Added</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-stone-100">
                  <td className="px-5 py-4 font-medium">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.role}</td>
                  <td className="px-5 py-4">{user.status}</td>
                  <td className="px-5 py-4">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
