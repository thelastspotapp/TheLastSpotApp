# V35 Stripe Reservation Lock + Auto Release SQL

Run this in Supabase SQL Editor before deploying.

```sql
alter table booking_requests
add column if not exists stripe_lock_status text default 'unlocked';

alter table booking_requests
add column if not exists payment_lock_created_at timestamptz;

alter table booking_requests
add column if not exists payment_lock_expires_at timestamptz;

alter table booking_requests
add column if not exists auto_released_at timestamptz;

alter table booking_requests
add column if not exists checkout_started_at timestamptz;

alter table booking_requests
add column if not exists checkout_completed_at timestamptz;

alter table booking_requests
add column if not exists checkout_failed_at timestamptz;

alter table booking_requests
add column if not exists inventory_released boolean default false;

alter table booking_requests
add column if not exists qr_activated_after_payment boolean default false;

alter table booking_requests
add column if not exists host_release_notice_sent boolean default false;

grant all on booking_requests to anon;
```
