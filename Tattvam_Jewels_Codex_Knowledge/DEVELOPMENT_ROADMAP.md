# Development Roadmap — Tattvam Jewels

## Guiding principle
Build the smallest reliable system that supports the first real orders. Prioritise business operations and correctness over feature count. Do not start every phase at once.

## Phase 0 — Decisions and project setup
- Confirm business name/brand assets and first product categories.
- Confirm launch target, budget, supplier terms, packaging, shipping and tax approach.
- Confirm stack and create Git repository.
- Install supported Node.js LTS, pnpm and project dependencies after checking current official guidance.
- Create Next.js TypeScript app.
- Add formatting, linting, type checking and basic test setup.
- Configure development database and `.env.example`.
**Exit:** app runs locally, Git is clean, environment setup is documented.

## Phase 1 — Foundation and admin access
- Establish module structure and database connection.
- Add migrations and seed/development data.
- Implement secure admin authentication and role model.
- Create admin layout/navigation and responsive shell.
- Add audit-log foundation.
**Exit:** owner can securely access an empty admin dashboard.

## Phase 2 — Catalogue and product media
- Create categories, products, variants/SKUs and media records.
- Upload and manage product images through the chosen media provider.
- Build product create/edit/list/detail screens.
- Add collection/drop and publication states.
**Exit:** owner can create a product and publish it as draft/active/sold out.

## Phase 3 — Purchasing, receiving and QC
- Manage suppliers and purchase entries.
- Record received quantities and unit costs.
- Perform receiving QC; accepted quantity becomes sellable, rejected quantity is recorded separately.
- Store supplier invoice/reference attachments if needed.
**Exit:** physical stock can be received with an auditable QC result.

## Phase 4 — Inventory ledger
- Implement inventory movements and balance calculation/projection.
- Implement manual adjustments with reason and audit trail.
- Show on-hand, sellable, reserved, damaged and available quantities.
- Add tests for ledger arithmetic and concurrency.
**Exit:** admin inventory is trustworthy and explainable.

## Phase 5 — Storefront
- Build mobile-first home, collection/drop pages, product listing and product detail.
- Add accurate availability and sold-out state.
- Add cart and guest checkout flow.
- Add shipping/contact capture and policy pages.
**Exit:** a customer can browse and submit a checkout attempt.

## Phase 6 — Payments and order management
- Integrate chosen gateway (Razorpay is proposed).
- Create local payment attempts and verify webhooks.
- Implement idempotency, reservation expiry/release and order confirmation.
- Build order list/detail and manual social-order entry.
**Exit:** paid orders are reliably recorded; failed/unpaid orders do not permanently consume stock.

## Phase 7 — Packing and courier fulfilment
- Dispatch QC and packing workflow.
- Integrate selected courier/aggregator if commercially suitable.
- Store AWB and shipment events; support manual tracking fallback.
- Record delivery, failed delivery and RTO.
**Exit:** owner can process an order from confirmation through delivery.

## Phase 8 — Returns, refunds and reconciliation
- Build return request review and inspection.
- Record refund/replacement and returned-stock disposition.
- Reconcile gateway transactions, fees and settlements.
**Exit:** exceptions and money movements are auditable.

## Phase 9 — Accounting, notifications and reporting
- Decide accounting workflow with accountant; integrate accounting software only if useful.
- Add transactional email/WhatsApp notifications with customer consent and provider compliance.
- Build sales, stock, product performance, expenses and profit reports.
- Add exports and backup/restore runbook.
**Exit:** owner can run routine operations and review business performance without spreadsheets as the primary system.

## Launch priority
For a very small first collection, it may be more important to launch a secure catalogue, simple checkout, reliable payment/order capture and a usable stock admin than to complete every advanced report or integration. Some workflows may initially be manual but must be recorded consistently.

## Definition of done for each task
- Business rule is clear.
- UI works on mobile and desktop where relevant.
- Server-side validation and permission checks exist.
- Database changes have migrations.
- Critical logic has tests.
- Errors and empty states are handled.
- No secrets or customer data are committed.
- Lint, type-check, tests and build are run and results reported.
- Documentation is updated when decisions change.
