# V16 Stripe + Payments SQL

```sql
alter table booking_requests add column if not exists stripe_payment_intent text;

alter table booking_requests add column if not exists stripe_checkout_session text;

alter table booking_requests add column if not exists payment_amount int default 0;

alter table booking_requests add column if not exists deposit_amount int default 0;

alter table booking_requests add column if not exists refund_amount int default 0;

alter table booking_requests add column if not exists cancellation_fee int default 0;

alter table booking_requests add column if not exists payment_method text;

alter table booking_requests add column if not exists payout_date timestamptz;

grant all on booking_requests to anon;
```
