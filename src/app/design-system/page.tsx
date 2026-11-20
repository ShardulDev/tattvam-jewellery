import Link from "next/link";
import Image from "next/image";
import { AdminThemeScope, StorefrontThemeScope } from "@/components/theme/theme-scope";
import { ThemePreviewCard } from "@/components/theme/theme-preview-card";
import { ThemeSampleContent } from "@/components/theme/theme-sample-content";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_STOREFRONT_THEME, STOREFRONT_THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Design system | ${BRAND.name}`,
  description: `A visual preview of ${BRAND.name} themes and semantic UI tokens.`,
};

export default function DesignSystemPage() {
  return (
    <StorefrontThemeScope themeId={DEFAULT_STOREFRONT_THEME}>
      <header className="border-b border-border bg-background">
        <nav
          className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
          aria-label="Design system navigation"
        >
          <Link
            className="flex items-center gap-3 font-heading text-xl font-semibold tracking-[0.08em]"
            href="/"
          >
            <Image
              src={BRAND.iconAssetPath}
              alt=""
              width={96}
              height={64}
              className="h-10 w-auto"
            />
            <span>{BRAND.name}</span>
          </Link>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#themes"
            >
              Themes
            </a>
            <a
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#admin-theme"
            >
              Admin appearance
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="max-w-3xl" aria-labelledby="page-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Brand foundation
          </p>
          <h1
            id="page-title"
            className="mt-4 font-heading text-5xl font-medium leading-tight sm:text-6xl"
          >
            One thoughtful system. Six expressions.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            {BRAND.name}&apos;s components use semantic colour tokens. A theme changes the
            values at its scope; the shared buttons, cards and fields stay the same.
          </p>
          <Link
            className={cn(buttonVariants({ variant: "outline", className: "mt-7" }))}
            href="/"
          >
            Return to the brand page
          </Link>
        </section>

        <section id="themes" className="mt-16 scroll-mt-8" aria-labelledby="themes-title">
          <div className="mb-7 max-w-2xl">
            <h2
              id="themes-title"
              className="font-heading text-3xl font-medium sm:text-4xl"
            >
              Storefront themes
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Burgundy Elegance is active by default. The same preview component is
              rendered with each palette to make theme changes easy to compare.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {STOREFRONT_THEMES.map((theme) => (
              <ThemePreviewCard
                key={theme.id}
                theme={theme}
                themeId={theme.id}
                isDefault={theme.id === DEFAULT_STOREFRONT_THEME}
              />
            ))}
          </div>
        </section>

        <section
          id="admin-theme"
          className="mt-16 scroll-mt-8"
          aria-labelledby="admin-title"
        >
          <div className="mb-7 max-w-2xl">
            <h2
              id="admin-title"
              className="font-heading text-3xl font-medium sm:text-4xl"
            >
              Independent admin appearance
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This neutral operational theme has its own scope and token set. Changing the
              storefront palette does not change this preview.
            </p>
          </div>
          <AdminThemeScope className="rounded-2xl border border-border p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Admin · Neutral Operations
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Readable, calm, and built for daily work.
                </p>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                Independent
              </span>
            </div>
            <div className="max-w-xl">
              <ThemeSampleContent
                title="Operational workspace"
                description="Shared UI primitives rendered inside the separate admin token scope."
              />
            </div>
          </AdminThemeScope>
        </section>
      </main>
    </StorefrontThemeScope>
  );
}
