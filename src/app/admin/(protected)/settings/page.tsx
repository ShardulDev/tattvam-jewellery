import Link from "next/link";
import { requireAdminPermission } from "@/server/auth/authorization";
import { ADMIN_PERMISSIONS, hasAdminPermission } from "@/server/auth/permissions";

export default async function AdminSettingsPage() {
  const session = await requireAdminPermission(ADMIN_PERMISSIONS.profileView);
  return (
    <>
      <div className="mb-7">
        <p className="text-sm text-stone-500">Admin / Settings</p>
        <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl">
          Settings
        </h1>
      </div>
      <section className="rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="font-semibold">Your account</h2>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-stone-500">Name</dt>
            <dd className="mt-1 font-medium">{session.user.name}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Email</dt>
            <dd className="mt-1 font-medium">{session.user.email}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Role</dt>
            <dd className="mt-1 font-medium">{session.user.role}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Account status</dt>
            <dd className="mt-1 font-medium">Active</dd>
          </div>
        </dl>
      </section>
      {hasAdminPermission(session.user.role, ADMIN_PERMISSIONS.administratorsRead) ? (
        <Link
          href="/admin/settings/users"
          className="mt-5 inline-flex rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-stone-50"
        >
          View administrator accounts
        </Link>
      ) : null}
    </>
  );
}
