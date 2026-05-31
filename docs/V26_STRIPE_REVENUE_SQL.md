# V26 Stripe Revenue Engine SQL

```sql
alter table booking_requests add column if not exists stripe_payment_intent text;
alter table booking_requests add column if not exists payment_status text default 'pending';
alter table booking_requests add column if not exists payout_status text default 'unpaid';
alter table booking_requests add column if not exists platform_fee numeric default 0.15;
alter table booking_requests add column if not exists host_payout_amount numeric default 0;
alter table booking_requests add column if not exists total_charge_amount numeric default 0;

alter table user_profiles add column if not exists stripe_account_id text;
alter table user_profiles add column if not exists payouts_enabled boolean default false;
alter table user_profiles add column if not exists total_host_earnings numeric default 0;

grant all on booking_requests to anon;
grant all on user_profiles to anon;
```
