"use client";

import { authClient } from "@/lib/auth-client";

export function AdminLogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut();
        window.location.assign("/admin/login");
      }}
      className="rounded-md border border-stone-300 px-3 py-2 text-xs font-medium hover:bg-stone-50"
    >
      Sign out
    </button>
  );
}
