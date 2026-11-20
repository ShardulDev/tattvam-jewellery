# Database Design — Tattvam Jewels

This is a conceptual starting point, not a final migration specification. Confirm fields, constraints and accounting treatment before implementing migrations.

## 1. Core modelling principles
1. Use stable internal IDs (UUIDs or another consistent strategy) and unique human-readable SKUs.
2. Separate product design from sellable variant/SKU when variants exist.
3. Maintain an auditable inventory movement ledger.
4. Treat stock states separately: received/pending QC, sellable, reserved, damaged/rejected, sold/fulfilled and returned-pending-inspection.
5. Store money as integer minor units (paise) with currency, or use an explicitly chosen exact decimal strategy. Never use floating-point arithmetic for money.
6. Keep order, payment, shipment and return state machines separate.
7. Preserve historical prices and costs on order/purchase line items; do not recalculate old orders from today's product price.
8. Record who performed important actions and when.

## 2. Suggested entities

### Catalogue
- `products`: product/design identity, title, description, category, active state, drop/collection, publication state.
- `product_variants`: option combinations where required (e.g. colour/size); avoid variants if a design has no meaningful options.
- `skus`: unique sellable stock-keeping unit, barcode/reference if used, product/variant relation.
- `product_media`: image URL/provider ID, alt text, sort order.
- `categories`, `collections` or `drops`.

### Suppliers and purchasing
- `suppliers`: business name, contact details, notes, tax/invoice details where appropriate.
- `purchase_entries` or `purchase_orders`: supplier, reference, date, status, totals and notes.
- `purchase_items`: SKU/product, ordered quantity, received quantity, unit purchase cost, discounts and allocated costs if tracked.
- `goods_receipts`: actual receipt event and date.
- `goods_receipt_items`: accepted, rejected and pending-QC quantities.

### Quality
- `qc_inspections`: receipt or dispatch inspection, inspector, timestamp, result and notes.
- `qc_inspection_items`: SKU/order item, quantity checked, pass/fail and defect reason.
- `defect_reasons`: controlled list of defect categories.

### Inventory
- `inventory_movements`: immutable or correction-by-reversal ledger entries with SKU, quantity delta, movement type, source reference, timestamp, actor and note.
- `inventory_reservations`: SKU, order/cart reference, quantity, expiry, status.
- Optional `inventory_balances`: derived/current balance for fast reads, updated transactionally with ledger entries.

### Customers and orders
- `customers`: name and contact data; avoid collecting unnecessary information.
- `customer_addresses`: shipping/billing addresses as needed.
- `orders`: order number, customer/guest details, sales channel, lifecycle status, currency, subtotal, discount, shipping, tax and grand total snapshots.
- `order_items`: SKU/product snapshot, title/SKU snapshot, quantity, unit selling price, discount and cost snapshot where appropriate.
- `order_status_events`: status history and actor/source.

### Payments and refunds
- `payment_attempts`: order, provider, provider order/payment IDs, amount, currency, status and timestamps.
- `payment_webhook_events`: provider event ID, signature-verification result, payload reference/redacted data, processing status and idempotency key.
- `refunds`: payment/order reference, amount, provider refund ID, reason and status.
- `settlements` or `payment_reconciliations`: provider settlement reference, fees, taxes/charges and reconciliation state.

### Fulfilment
- `shipments`: order, courier/provider, AWB, shipment status, shipping charge, dispatch and delivery timestamps.
- `shipment_events`: tracking event history and provider event ID.
- `packages`: optional package dimensions/weight and packaging cost.

### Returns
- `return_requests`: order, customer reason, requested date, decision and status.
- `return_items`: order item, quantity, reason and inspection/disposition.
- Returned goods should create inventory movements only after inspection and a deliberate disposition decision.

### Admin, audit and finance
- `admin_users`, `roles`, `permissions` or equivalent auth-provider mapping.
- `audit_logs`: actor, action, entity, before/after summary, timestamp.
- `expenses`: category, amount, date, supplier/payee, tax data and attachment reference.
- Optional `cost_allocations` for packaging, freight or other landed costs.

## 3. Inventory ledger and stock equation
A simplified sellable-stock calculation:

`Sellable on hand = accepted receipts + approved returns + positive adjustments - sales/fulfilments - damage/write-off - negative adjustments`

`Available to promise = sellable on hand - active reservations`

Choose one exact point in the order lifecycle to convert a reservation into a sale/stock deduction. Do not deduct twice. Every stock-changing action must be represented by a ledger movement and applied atomically.

Example movement types:
- `RECEIPT_ACCEPTED`
- `RECEIPT_REJECTED`
- `RESERVATION_CREATED`
- `RESERVATION_RELEASED`
- `ORDER_FULFILLED`
- `RETURN_ACCEPTED`
- `DAMAGE_WRITE_OFF`
- `MANUAL_ADJUSTMENT`
- `RESERVATION_EXPIRED`

A reservation may be represented separately from physical ledger movements; document the chosen model and enforce consistency.

## 4. Overselling prevention
For a scarce SKU, two concurrent checkout attempts must not both reserve the final unit.

Use a database transaction with a row lock or atomic conditional update:
- Verify available quantity is sufficient.
- Create reservation and update any balance projection in the same transaction.
- Enforce unique/idempotency constraints for checkout attempts and provider webhooks.
- Expire/release reservations safely.
- Test concurrent requests for the final unit.

Never rely only on a disabled “Add to cart” button or a cached stock count.

## 5. Lifecycle separation
Example independent lifecycles:
- Order: `PENDING_PAYMENT`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `RETURNED` (final names to be designed).
- Payment: `CREATED`, `PENDING`, `AUTHORIZED`, `CAPTURED/PAID`, `FAILED`, `PARTIALLY_REFUNDED`, `REFUNDED`.
- Shipment: `NOT_CREATED`, `BOOKED`, `PICKED_UP`, `IN_TRANSIT`, `DELIVERED`, `RTO`, `LOST`, `CANCELLED`.
- Return: `REQUESTED`, `UNDER_REVIEW`, `APPROVED`, `RECEIVED`, `INSPECTED`, `REFUNDED/REPLACED`, `REJECTED`, `CLOSED`.

These are examples; final state transitions must be explicit and validated.

## 6. Profit reporting
Do not calculate “net profit” as sales minus purchase price alone. At minimum distinguish:
- Gross sales.
- Discounts and cancellations.
- Refunds.
- Net sales.
- Cost of goods sold (using a defined costing method).
- Gross profit = net sales minus cost of goods sold.
- Variable fulfilment/payment/packaging costs.
- Contribution after variable costs.
- Operating expenses.
- Taxes and accounting adjustments as advised by an accountant.
- Net profit according to the chosen accounting basis.

Pick and document a costing method (for example, actual batch cost or weighted average) with an accountant. Keep tax components separate where required.

## 7. Constraints and indexes to consider
- Unique SKU.
- Unique order number.
- Unique provider event ID per provider.
- Unique provider payment/refund/shipment identifiers where applicable.
- Positive quantities for order/purchase lines; ledger delta may be signed.
- Non-negative sellable/available balances enforced transactionally.
- Index foreign keys, order date/status, SKU, customer contact lookup and provider IDs.
- Use soft deletion or inactive states for business records where historical references must remain valid.
