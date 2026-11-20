# Technical Architecture — Tattvam Jewels

## 1. Goal
Build a reliable, mobile-first e-commerce storefront plus an operator-friendly admin system for a small Indian imitation-jewellery business. Start as a modular monolith that can grow without premature infrastructure.

## 2. Proposed stack (confirm versions at implementation time)
- **Application:** Next.js App Router + TypeScript.
- **UI:** Tailwind CSS and shadcn/ui (or a consistent accessible component system).
- **Database:** PostgreSQL; Neon is a proposed managed provider, not a hard dependency.
- **ORM / migrations:** Drizzle ORM.
- **Validation:** Zod.
- **Forms:** React Hook Form where useful.
- **Data fetching:** Prefer React Server Components for server-rendered data; add TanStack Query only for client-side interactions that benefit from it.
- **Product media:** Cloudinary or another managed object/media service. Store media references/metadata in Postgres, not image binaries.
- **Payments:** Razorpay is the proposed India payment gateway; verify current fees, supported methods and integration requirements.
- **Shipping:** Shiprocket is a candidate aggregator; verify current commercial terms and service coverage.
- **Email:** Resend or another transactional email provider.
- **WhatsApp:** WhatsApp Business Platform directly or an authorised provider if/when automation is justified.
- **Hosting:** Vercel is a candidate for Next.js hosting. Select a commercial plan appropriate to production usage and terms.
- **Accounting:** Zoho Books is a candidate for accounting/GST workflows, subject to accountant review.
- **Analytics:** GA4 and Meta Pixel for acquisition/funnel measurement; Postgres for operational/business reporting.
- **Package manager:** pnpm is proposed.

These are recommendations, not irrevocable decisions. Check current vendor documentation, pricing, commercial terms, data-region options and compatibility before implementation.

## 3. Architecture style
Use a **modular monolith**:
- One deployable application initially.
- Clear modules for catalogue, purchasing, inventory, orders, payments, fulfilment, returns, customers and reporting.
- Keep business rules in server-side domain/service functions rather than scattering them across UI components.
- Use Route Handlers and Server Actions where appropriate.
- Use PostgreSQL as the operational source of truth.
- Keep external providers behind integration modules so they can be replaced.

Do not start with microservices, Kubernetes, Kafka, a separate NestJS/.NET backend, or distributed infrastructure.

## 4. Conceptual module boundaries
- `catalog`: products, categories, variants, SKUs, media, collections/drops.
- `purchasing`: suppliers, purchase orders/entries, goods receipt, unit costs.
- `quality`: receiving QC, dispatch QC, defect reasons.
- `inventory`: stock ledger, reservations, adjustments, stock states.
- `customers`: customer profiles, addresses, consent/preferences where relevant.
- `orders`: website/social orders, line items, discounts, cancellations.
- `payments`: gateway orders, payment attempts, webhook events, refunds, settlements.
- `fulfilment`: packages, courier bookings, AWB, tracking, delivery and RTO.
- `returns`: return requests, inspection, disposition and refund/replacement.
- `finance`: cost records, expenses, reconciliation and reporting.
- `notifications`: email/WhatsApp events and templates.
- `admin`: staff accounts, roles, permissions and audit log.

## 5. Suggested repository evolution
Start with a single Next.js app. Extract packages only when the codebase needs them. A possible later layout:

```text
tattvam-jewels/
  AGENTS.md
  README_TRANSFER.md
  BUSINESS_REQUIREMENTS.md
  TECHNICAL_ARCHITECTURE.md
  DATABASE_DESIGN.md
  DEVELOPMENT_ROADMAP.md
  src/
    app/
    components/
    modules/
      catalog/
      purchasing/
      quality/
      inventory/
      customers/
      orders/
      payments/
      fulfilment/
      returns/
      finance/
      notifications/
      admin/
    lib/
    server/
  drizzle/
  tests/
```

Do not force this exact layout before inspecting the generated Next.js starter and agreeing on conventions.

## 6. Security and reliability
- Secure admin authentication; customer guest checkout does not mean admin routes are unauthenticated.
- Role-based access control for owner/admin and any future staff roles.
- Validate all inputs on the server.
- Use secure, httpOnly cookies or a vetted auth solution; do not build custom cryptography.
- Apply rate limits and abuse protection to login, OTP and checkout endpoints.
- Verify payment webhook signatures and make webhook processing idempotent.
- Treat browser redirects as UX only, not proof of payment.
- Never expose secrets to browser bundles.
- Protect customer personal data; collect only what is required.
- Maintain audit records for stock adjustments, refunds and sensitive admin actions.
- Use backups and test restoration before production reliance.

## 7. External integration principles
- PostgreSQL remains the master record for products, sellable stock, orders and operational status.
- Payment provider is authoritative for gateway transaction events, but local records must be reconciled.
- Courier provider supplies shipment/tracking events; store a local event history.
- Accounting software receives appropriate financial data; it should not control real-time storefront stock.
- WhatsApp/email providers deliver messages; the application owns message intent and records delivery outcomes where available.
- Make integrations retry-safe and idempotent. Store provider IDs and webhook/event IDs.

## 8. Performance and scale
- Optimise product images and use responsive formats.
- Use server rendering/caching for catalogue pages where safe.
- Do not cache stock availability in a way that allows stale overselling.
- Add queues/background workers only when there is a concrete need for retries, scheduled tasks or higher-volume processing.
- Start with PostgreSQL search; add a dedicated search engine only if catalogue size and search requirements justify it.

## 9. Development and deployment
- Use separate development and production environments.
- Commit migrations and run them through a controlled deployment process.
- Keep `.env.example` with variable names and safe placeholders only.
- Never commit `.env`, API secrets, customer exports or payment credentials.
- Use Git branches/checkpoints and inspect diffs before merging.
- Run lint, type-check, tests and production build before release.
