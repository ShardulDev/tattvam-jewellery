# Tattvam Jewels

Development foundation for the Tattvam Jewels storefront and operations platform.
The project is a Next.js App Router modular monolith. Phase 1 adds administrator
authentication and a protected dashboard foundation; business workflows remain
for later approved phases.

## Requirements and local setup

- Node.js 24 LTS (the toolchain requires Node.js 20.19 or newer)
- pnpm 12
- PostgreSQL for administrator authentication and database-backed features

On macOS with Homebrew, install Node and pnpm with `brew install node@24 pnpm`.
Then:

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

Set up PostgreSQL as described below before using `/admin/login`. Open
<http://127.0.0.1:3100> for the landing page and
<http://127.0.0.1:3100/admin/login> for administrator sign-in.

## PostgreSQL, migrations, and first owner

Install/start local PostgreSQL and create an empty database named
`tattvam_jewels`. Set `DATABASE_URL` in `.env.local`, generate a secret with
`openssl rand -base64 32` for `BETTER_AUTH_SECRET`, and set `BETTER_AUTH_URL` to
the app origin. Then:

```sh
pnpm db:migrate
pnpm provision:owner
```

Set `OWNER_NAME` and `OWNER_EMAIL` in `.env.local` before provisioning. The CLI
asks for the password interactively; it is never passed as an argument. Owner
provisioning is idempotent for the same email and refuses conflicting accounts.
Keep credentials out of source control and `NEXT_PUBLIC_*` variables.

The server-only database connection is in `src/server/db/index.ts`, the schema
in `src/server/db/schema.ts`, and migrations in `drizzle/`.

## Administrator authentication

Better Auth provides email/password authentication, scrypt password hashing,
database sessions, secure HTTP-only cookies, rate limiting, and the admin role
foundation. Public auth HTTP endpoints are restricted to sign-in, session lookup
and sign-out; registration, user creation and role mutation endpoints are not
exposed. Authorization is checked against database records on protected server
routes, and account status is rechecked before session creation and use.

Roles are `OWNER`, `ADMIN`, `OPERATIONS` and `VIEWER`. Dashboard/profile read
access is granted to all; administrator listing to OWNER and ADMIN; administrator
management to OWNER only. Future module permissions can be added centrally. No
administrator creation or role editor is available in the UI yet.

Routes: `/admin/login`, `/admin`, `/admin/settings`, and
`/admin/settings/users`. Upcoming business modules are disabled navigation
labels. The dashboard intentionally shows no fabricated metrics.

## Development commands

```sh
pnpm dev
pnpm db:generate
pnpm db:migrate
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
```

Authentication integration tests use embedded PostgreSQL (PGlite) and the
checked-in migration, so they do not require local DB credentials.

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the multi-theme architecture and
visual demo at `/design-system`. Business, architecture, database and roadmap
documents are in `Tattvam_Jewels_Codex_Knowledge/`.
