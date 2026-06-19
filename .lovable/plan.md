## Razorpay Payment Gateway — Implementation Plan

### Prerequisites
1. Enable **Lovable Cloud** (database + secrets + server runtime).
2. Add secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` (optional but recommended). `VITE_RAZORPAY_KEY_ID` mirrors the public key for the checkout widget.
3. Reuse existing `GOOGLE_SHEETS_WEBHOOK_URL` for sheet sync.

### Database (migration)
- `public.payments` — id, invoice_no (unique, auto), razorpay_order_id, razorpay_payment_id, razorpay_signature, status (`created|paid|failed`), amount, currency, product, customer_name, company_name, email, phone, address, error_reason, created_at, updated_at.
- `public.app_role` enum + `public.user_roles` + `has_role()` security-definer fn (for admin gating).
- RLS: inserts/reads via server functions only (service role); admin SELECT via `has_role(auth.uid(),'admin')`.

### Server (TanStack server fns + public route)
- `src/lib/payments/razorpay.functions.ts`
  - `createRazorpayOrder({ product, amount, customer })` → calls Razorpay Orders API with Basic Auth, inserts a `created` row, returns `{ orderId, keyId, invoiceNo }`.
  - `verifyRazorpayPayment({ order_id, payment_id, signature, customer })` → HMAC-SHA256 verify (`order_id|payment_id` with key secret, timing-safe), updates row to `paid`, appends to Google Sheet, sends confirmation email via Lovable Emails (Resend fallback noted), returns `{ ok, invoiceNo }`.
  - `recordRazorpayFailure({ order_id, reason })` → marks row `failed`.
  - `listPayments()` (admin only via `requireSupabaseAuth` + `has_role`) → for dashboard.
- `src/routes/api/public/razorpay-webhook.ts` — verifies `x-razorpay-signature`, reconciles status (defense in depth if browser callback is missed).

### Frontend
- Rewrite `src/routes/payment.tsx`:
  - Step 1: pick product/service (dropdown sourced from existing products page list, plus "Custom invoice").
  - Step 2: form (Name, Company, Email, Phone, Address, Amount) with Zod validation.
  - Step 3: load Razorpay checkout.js, call `createRazorpayOrder`, open checkout supporting UPI/Card/NetBanking/Wallets.
  - On `handler` success → call `verifyRazorpayPayment` → show "Payment Successful" with invoice number.
  - On `payment.failed` / modal dismiss → call `recordRazorpayFailure` → show "Payment Failed. Please try again."
  - Keep UPI QR (existing) as a secondary manual option.
- New `src/routes/_authenticated/admin/payments.tsx` (admin dashboard):
  - Stat tiles: Total / Successful / Failed / Revenue.
  - Search by customer name, status filter.
  - Table of payments + **Export CSV** button (client-side from fetched rows).
- Admin layout requires sign-in; first admin seeded by SQL note for the user.

### Security
- Secret key never reaches browser; only `VITE_RAZORPAY_KEY_ID` (publishable) is used by checkout.js.
- Signature verification uses `crypto.timingSafeEqual`.
- All writes go through server fns with Zod validation.
- Admin endpoints gated by `requireSupabaseAuth` + `has_role(_,'admin')`.

### Out of scope (will note for follow-up)
- Auto-generated PDF invoice attachment (text email only for now).
- Refund flow.
- Multi-currency (INR only).

### What I need from you
- Confirm: proceed with enabling Lovable Cloud + I'll request Razorpay keys.
- Email **from** address for confirmations (defaults to `onboarding@resend.dev` for testing).
- Your email to seed as the first admin user (after Cloud is on).