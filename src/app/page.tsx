import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { StorefrontThemeScope } from "@/components/theme/theme-scope";
import { DEFAULT_STOREFRONT_THEME } from "@/lib/themes";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <StorefrontThemeScope themeId={DEFAULT_STOREFRONT_THEME}>
      <header className="border-b border-border bg-background">
        <nav
          className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
          aria-label="Main navigation"
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
              priority
            />
            <span>{BRAND.name}</span>
          </Link>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#story"
            >
              Our story
            </a>
            <Link
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/design-system"
            >
              Design system
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section
          id="story"
          className="mx-auto grid min-h-[min(720px,calc(100svh-80px))] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]"
          aria-labelledby="hero-title"
        >
          <div>
            <Badge variant="muted">A considered collection is on its way</Badge>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              A little something, beautifully chosen
            </p>
            <h1
              id="hero-title"
              className="mt-5 max-w-2xl font-heading text-6xl font-medium leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Jewellery for <span className="text-primary">your every day.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
              Thoughtfully chosen pieces that bring a touch of occasion to the everyday.
              {BRAND.name} is taking shape; our first collection is being curated.
            </p>
            <Link
              className={cn(buttonVariants({ className: "mt-8" }))}
              href="/design-system"
            >
              Explore our design direction
            </Link>
          </div>

          <div className="relative mx-auto aspect-[3/2] w-full max-w-xl">
            <Image
              src={BRAND.iconAssetPath}
              alt="Gold lotus emblem with gemstone details"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
              priority
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-5 py-6 text-xs tracking-wide text-muted-foreground sm:flex-row sm:px-8">
          <span>Curated with care in India</span>
          <span>{BRAND.tagline}</span>
        </div>
      </footer>
    </StorefrontThemeScope>
  );
}
