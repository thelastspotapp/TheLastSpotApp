# V11 Growth Stack SQL

Run this in Supabase SQL Editor:

```sql
-- V11 Growth Stack columns

alter table booking_requests add column if not exists payment_status text default 'unpaid';
alter table booking_requests add column if not exists qr_code text;
alter table booking_requests add column if not exists stripe_checkout_url text;
alter table booking_requests add column if not exists deposit_amount int8;
alter table booking_requests add column if not exists platform_fee int8;
alter table booking_requests add column if not exists host_payout int8;

-- Keep MVP update permissions active
grant select, insert, update on booking_requests to anon;
grant select, insert, update on host_submissions to anon;

drop policy if exists "Allow public updates on booking requests" on booking_requests;
create policy "Allow public updates on booking requests"
on booking_requests
for update
to anon
using (true)
with check (true);

-- Optional: set defaults for existing booking rows
update booking_requests
set payment_status = coalesce(payment_status, 'unpaid'),
    deposit_amount = coalesce(deposit_amount, 0),
    platform_fee = coalesce(platform_fee, round((spot_price::numeric * 0.15))::int8),
    host_payout = coalesce(host_payout, spot_price - round((spot_price::numeric * 0.15))::int8)
where payment_status is null or platform_fee is null or host_payout is null;

```
