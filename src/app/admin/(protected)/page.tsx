import { requireAdminPermission } from "@/server/auth/authorization";
import { ADMIN_PERMISSIONS } from "@/server/auth/permissions";

export default async function AdminDashboardPage() {
  const session = await requireAdminPermission(ADMIN_PERMISSIONS.dashboardView);
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-stone-500">{today}</p>
        <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl font-medium">
          Welcome, {session.user.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          Your workspace is ready. Business activity will appear here as the catalogue,
          inventory and order workflows are introduced.
        </p>
      </div>
      <section
        aria-labelledby="activity-heading"
        className="rounded-xl border border-stone-200 bg-white p-6"
      >
        <h2 id="activity-heading" className="font-semibold">
          Business activity
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          There is no business data to show yet. No sales, stock or order figures are
          displayed until those modules are connected.
        </p>
      </section>
      <section aria-labelledby="modules-heading" className="mt-7">
        <h2
          id="modules-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500"
        >
          Workspace modules
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Catalogue",
            "Suppliers & purchasing",
            "Inventory",
            "Orders & shipping",
            "Returns & finance",
            "Reports",
          ].map((name) => (
            <div
              key={name}
              className="rounded-xl border border-dashed border-stone-300 bg-white/70 p-5"
            >
              <h3 className="text-sm font-medium">{name}</h3>
              <p className="mt-1 text-xs text-stone-500">Upcoming phase</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
