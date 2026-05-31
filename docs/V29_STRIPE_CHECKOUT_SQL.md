# V29 Real Stripe Checkout Flow SQL

```sql
alter table booking_requests add column if not exists checkout_status text default 'not_started';
alter table booking_requests add column if not exists checkout_url text;
alter table booking_requests add column if not exists stripe_customer_id text;
alter table booking_requests add column if not exists receipt_url text;
alter table booking_requests add column if not exists refund_status text default 'none';
alter table booking_requests add column if not exists dispute_status text default 'none';
alter table booking_requests add column if not exists cancellation_window_hours int default 24;
alter table booking_requests add column if not exists payout_hold_days int default 2;
alter table booking_requests add column if not exists payment_captured_at timestamptz;
alter table booking_requests add column if not exists refund_processed_at timestamptz;

grant all on booking_requests to anon;
```

Future secure environment variables for Vercel:

```text
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
```
