"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { BRAND } from "@/lib/brand";
import { authClient } from "@/lib/auth-client";
import { AdminThemeScope } from "@/components/theme/theme-scope";

const loginSchema = z.object({ email: z.email(), password: z.string().min(1) });

export function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const values = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });
    if (!values.success) {
      setError("Enter a valid email address and password.");
      return;
    }
    setPending(true);
    try {
      const result = await authClient.signIn.email({
        ...values.data,
        callbackURL: "/admin",
      });
      if (result.error) {
        setError("Unable to sign in with those credentials.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("Unable to sign in with those credentials.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AdminThemeScope className="flex min-h-screen items-center justify-center bg-[#f5f2ee] px-4 py-12 text-stone-900">
      <main className="w-full">
        <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <Image
              src={BRAND.iconAssetPath}
              alt="Tattvam Jewels lotus"
              width={76}
              height={76}
              className="mx-auto mb-4 h-16 w-16 object-contain"
              priority
            />
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-900">
              {BRAND.name}
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-cormorant)] text-3xl font-medium">
              Administrator sign in
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Sign in to the Tattvam business workspace.
            </p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/15"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/15"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              disabled={pending}
              type="submit"
              className="w-full rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-stone-500">
            Administrator access is provisioned by the business owner.
          </p>
        </section>
      </main>
    </AdminThemeScope>
  );
}
