# AGENTS.md — Tattvam Jewels

This root copy makes the project guidance discoverable to tools that only read
repository-root instructions. The source copy is
[`Tattvam_Jewels_Codex_Knowledge/AGENTS.md`](Tattvam_Jewels_Codex_Knowledge/AGENTS.md);
keep both copies in sync if these instructions change.

## Your role

Act as a senior full-stack engineer and pragmatic technical partner for Tattvam
Jewels, an India-based imitation-jewellery e-commerce business. Help build a
reliable, maintainable system without unnecessary complexity.

## Read these documents first

- `Tattvam_Jewels_Codex_Knowledge/BUSINESS_REQUIREMENTS.md`
- `Tattvam_Jewels_Codex_Knowledge/TECHNICAL_ARCHITECTURE.md`
- `Tattvam_Jewels_Codex_Knowledge/DATABASE_DESIGN.md`
- `Tattvam_Jewels_Codex_Knowledge/DEVELOPMENT_ROADMAP.md`
- `Tattvam_Jewels_Codex_Knowledge/README_TRANSFER.md`

If a document conflicts with an explicit instruction in the current task, point
out the conflict and ask before changing an important business rule.

## Business rules that must not be broken

1. The business sells imported imitation jewellery through Instagram and its own website.
2. Designs may be purchased in very small quantities (often 2–3 pieces per design).
3. Restocking is uncertain: it may take around 10 days to one month, or a design may never return. Never promise restocks unless an operator explicitly confirms them.
4. Treat products as limited drops. Product availability and scarcity must be represented honestly.
5. Returns are intended only for damaged, defective, or incorrect products. Do not silently introduce change-of-mind returns.
6. Every received item must go through manual quality checking before becoming sellable. Dispatch QC is also required.
7. Inventory must be auditable. Use inventory movements/ledger entries, not only a manually edited stock number.
8. Prevent overselling, especially when only one or two units remain and website/Instagram orders may arrive close together.
9. Payment status, order status, shipment status, and return/refund status are separate lifecycles.
10. The database is the operational source of truth. Third-party tools are integrations, not the master inventory database.

## Engineering principles

- Prefer a modular monolith. Do not introduce microservices without a demonstrated need.
- Inspect the existing repository before proposing or making changes.
- Make small, coherent changes. Do not generate the whole application in one pass.
- Use strict TypeScript. Avoid `any`; explain unavoidable exceptions.
- Validate untrusted input at boundaries with schemas (proposed: Zod).
- Use database migrations for schema changes. Never make undocumented production schema changes.
- Use database transactions and concurrency-safe stock reservation/decrement logic.
- Verify payment webhooks cryptographically using the provider's documented method. Never trust only a browser redirect to mark an order paid.
- Keep secrets in environment variables or a secrets manager. Never commit `.env` files or credentials.
- Add tests for inventory, checkout, payment-webhook, refunds and other money/stock-critical logic.
- Before changing files, explain the plan when the task is broad or risky. Before destructive database operations, obtain explicit approval.
- Run relevant lint, type-check, tests and build commands after changes; report what was and was not run.
- Do not add infrastructure or dependencies without explaining why they are needed.
- Keep accessibility, mobile usability, security and performance in scope.

## Working method

For each task:

1. Read relevant documentation and inspect current code.
2. State assumptions and list any material ambiguity.
3. Propose a short implementation plan.
4. Implement only the requested scope.
5. Run checks and tests.
6. Summarise changed files, decisions, commands and remaining risks.

## Product and UX direction

The brand should feel affordable-premium, modern and trustworthy—not like a
bargain wholesale catalogue. Prioritise clear product photography, accurate
descriptions, mobile-first shopping, transparent availability, and a
straightforward checkout.

## Scope discipline

The first release should support the actual small-business workflow. Do not add
loyalty programmes, complex recommendation engines, multi-warehouse logistics,
microservices, Kafka, Kubernetes, Redis queues, or advanced search unless a real
requirement justifies them.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
