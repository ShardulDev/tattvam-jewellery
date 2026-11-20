import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminThemeScope } from "@/components/theme/theme-scope";
import { AdminLogoutButton } from "@/components/admin/logout-button";
import { getAdminSession } from "@/server/auth/authorization";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

const nav = [
  "Overview",
  "Catalogue",
  "Suppliers",
  "Purchases",
  "Inventory",
  "Orders",
  "Customers",
  "Shipping",
  "Returns",
  "Finance",
  "Reports",
  "Settings",
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminThemeScope className="min-h-screen">
      <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
        <aside className="border-b border-stone-200 bg-white p-5 md:min-h-screen md:border-b-0 md:border-r">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src={BRAND.iconAssetPath}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-xs font-bold tracking-[0.15em]">
              {BRAND.name}
              <small className="mt-1 block font-normal tracking-normal text-stone-500">
                Business workspace
              </small>
            </span>
          </Link>
          <nav
            aria-label="Admin navigation"
            className="mt-7 grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-1"
          >
            {nav.map((item) => {
              const active = item === "Overview";
              const href = item === "Settings" ? "/admin/settings" : "/admin";
              const className = `rounded-lg px-3 py-2 text-sm ${active ? "bg-emerald-950 text-white" : item === "Settings" ? "text-stone-700 hover:bg-stone-100" : "cursor-not-allowed text-stone-400"}`;
              if (!active && item !== "Settings") {
                return (
                  <span
                    key={item}
                    aria-disabled="true"
                    title="Upcoming module"
                    className={className}
                  >
                    {item}
                    <span className="sr-only">, upcoming module</span>
                  </span>
                );
              }
              return (
                <Link key={item} href={href} className={className}>
                  {item}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-stone-500">Tattvam Jewels / Admin</p>
              <p className="mt-1 text-sm font-medium">Business workspace</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-right">
                <p className="font-medium">{session.user.name}</p>
                <p className="text-xs text-stone-500">{session.user.role}</p>
              </div>
              <Link
                href="/admin/settings"
                className="hidden rounded-md border border-stone-300 px-3 py-2 text-xs font-medium hover:bg-stone-50 sm:inline-flex"
              >
                Profile
              </Link>
              <AdminLogoutButton />
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </AdminThemeScope>
  );
}
