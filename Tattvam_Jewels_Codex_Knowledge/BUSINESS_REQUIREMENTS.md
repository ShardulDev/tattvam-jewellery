# Business Requirements — Tattvam Jewels

## 1. Business overview
Tattvam Jewels is a planned India-based online imitation-jewellery brand. The business will sell imported imitation jewellery using Instagram as a discovery/sales channel and an official e-commerce website as its owned storefront.

The intended positioning is **affordable-premium**: attractive, curated, trustworthy and accessible, without looking like a low-quality wholesale listing site.

## 2. Roles and responsibilities
- **Owner / business operator:** the user's wife. She will own the business and lead daily operations, product decisions, purchasing, quality checks, customer handling and management.
- **Technology / planning support:** the user. He will support website development, systems, automation, finance visibility and planning. The long-term intention is for the owner to operate the business independently while technical maintenance remains with the user.

Design admin screens and workflows for a non-technical operator. Avoid making routine business operations depend on developer intervention.

## 3. Sourcing and product model
- Source imported imitation jewellery from wholesalers, initially around Surat.
- Typical purchase cost discussed: approximately ₹100–₹250 per piece. Actual cost varies by product and purchase.
- Initial buying quantity may be only 2–3 pieces per design.
- Restocking can take roughly 10 days to one month, and some designs may not be available again.
- Therefore, products should be managed as limited drops. Do not promise a restock date or imply a design will return unless confirmed.
- Record supplier, purchase date, quantity, unit cost, other landed costs, batch/receipt and quality outcome.

## 4. Product catalogue
Each sellable product/design should support:
- Internal product ID and unique SKU (and variant SKU if variants are introduced).
- Product name, category, description and material/finish details where known.
- Images, selling price, cost basis and active/inactive status.
- Drop/collection association.
- Quantity available and availability state.
- Clear product-specific notes such as limited quantity or sold out.
- Optional attributes such as colour, size, length, weight and closure type where relevant.

Do not claim a material, plating, anti-tarnish property, skin safety, water resistance or durability unless the supplier information or a documented test supports it.

## 5. Quality control
Manual quality checking is the current intended process:
1. Receive purchased stock.
2. Record received quantity and compare it with the purchase.
3. Inspect each piece for visible defects, finish, stones, clasps, alignment and damage as appropriate to the product.
4. Record accepted, rejected/damaged and pending-QC quantities.
5. Only accepted units become sellable.
6. Before dispatch, verify the exact item, condition, SKU and order quantity; record dispatch QC completion.

Keep the process lightweight but auditable. A QC checklist may be configurable by product category.

## 6. Sales channels and orders
- Website is the primary owned storefront.
- Instagram is a marketing and customer-acquisition channel; some orders may be initiated through Instagram/WhatsApp and manually entered into the admin system.
- The system should identify the sales channel for each order.
- Guest checkout should be supported; do not force customers to create an account at launch.
- Customer records should support order history and contact details needed for fulfilment, subject to privacy and security practices.

## 7. Limited-drop availability
- Show only genuinely sellable stock as available.
- Sold-out products can remain visible as archive/social proof if the owner chooses, but must be clearly marked sold out.
- Avoid “back in stock soon” or restock notifications unless the business actually supports them.
- A product may be marked discontinued / not expected to return.
- Reserve stock safely during checkout and release reservations when checkout/payment fails or expires according to a defined policy.

## 8. Returns, refunds and complaints
Current business intention:
- Accept returns only for damaged, defective or incorrect products.
- Publish a clear policy explaining how quickly a customer must report an issue, what evidence may be requested, how pickup/reverse shipping is handled, and the refund/replacement process.
- Do not implement a broad change-of-mind return promise by default.
- Admin must record reason, evidence, decision, returned quantity, QC result, refund/replacement and inventory disposition.
- Returned items must not automatically become sellable. They require inspection.

The final policy must be reviewed for compliance with applicable Indian consumer-protection and e-commerce requirements before launch.

## 9. Fulfilment and packaging
- Courier-based fulfilment is planned.
- Store shipment provider, AWB/tracking number, shipping charge, dispatch date, delivery status, RTO/failed-delivery status and delivery confirmation.
- Packaging should protect jewellery from tangling, scratching, moisture and transit damage while supporting the affordable-premium brand experience.
- Keep packaging and shipping costs visible for true order profitability.

## 10. Finance and reporting
The system should make it possible to understand:
- Sales, discounts, cancellations and refunds.
- Gross revenue and net sales.
- Product purchase cost / cost of goods sold.
- Packaging, shipping, payment gateway and other variable costs.
- Gross profit and contribution after variable costs.
- Operating expenses and estimated net profit.
- Damaged stock, write-offs, supplier issues and losses.
- Payment settlement and reconciliation differences.

Do not label revenue minus purchase cost as final net profit. Define each metric and account for relevant costs. Tax treatment should be confirmed with an Indian accountant.

## 11. Operational requirements
Paperless workflows are preferred for:
- Supplier and purchase records.
- Goods receipt and QC.
- Product/SKU and inventory.
- Website and manually entered social orders.
- Payments and settlements.
- Packing, dispatch and shipment tracking.
- Returns, refunds and damaged stock.
- Customer order history.
- Reports and audit trail.

The owner should be able to operate daily tasks from a simple admin interface, preferably on a phone as well as desktop.

## 12. Launch constraints and open decisions
Known context includes a modest initial budget discussed around ₹15,000–₹25,000 and a desire to launch before the Diwali selling season. These are planning constraints, not a confirmed current budget or deadline; reconfirm before making purchase or launch commitments.

Still to confirm:
- Final product categories and first collection size.
- Actual supplier terms, invoices and replacement policy.
- Final price bands and discount rules.
- Packaging specification and cost.
- Courier provider and shipping policy.
- COD availability and risk controls.
- GST registration/tax position and invoicing requirements.
- Exact return-reporting window and reverse-logistics policy.
- Brand identity, photography standards and final website content.
