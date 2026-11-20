# Tattvam Jewels

Development foundation for the Tattvam Jewels storefront and operations
platform. The project uses the Next.js App Router as a modular monolith.
Business workflows and the production database schema will be introduced in
later approved phases.

## Requirements

- Node.js 24 LTS (the toolchain requires Node.js 20.19 or newer)
- pnpm 12
- PostgreSQL when working on database-backed features

On macOS with Homebrew, install Node and pnpm with `brew install node@24 pnpm`.
Then install dependencies and start the application:

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

Open <http://127.0.0.1:3100>. The landing page does not require a database
connection. The development server binds to port 3100 because port 3000 is
unavailable in this environment.

## Development commands

```sh
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
```

## PostgreSQL and Drizzle

PostgreSQL is the intended operational source of truth. No hosted provider has
been selected and no business tables or migrations are created in Phase 0. For
future database work, create a local PostgreSQL database, set `DATABASE_URL` in
`.env.local`, and use the server-only connection factory in
`src/server/db/index.ts`. Drizzle configuration is in `drizzle.config.ts`.
Never commit `.env` files or credentials, or expose secrets via `NEXT_PUBLIC_*`
variables.

## Project structure

```text
src/
  app/                    App Router pages and global styles
  components/theme/       Theme scopes and theme previews
  components/ui/          Shared interface components
  lib/                    Brand, environment, theme and utility modules
  server/db/              Server-only PostgreSQL connection and schema entry
```

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the multi-theme system and its
`/design-system` preview. The business requirements, architecture, database
design and roadmap are in `Tattvam_Jewels_Codex_Knowledge/`.
