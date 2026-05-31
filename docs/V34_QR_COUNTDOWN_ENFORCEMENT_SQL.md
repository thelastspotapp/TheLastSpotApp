# V34 Live QR Verification + Countdown Enforcement SQL

Run this in Supabase SQL Editor before deploying.

```sql
alter table booking_requests
add column if not exists hold_started_at timestamptz;

alter table booking_requests
add column if not exists hold_duration_minutes int default 15;

alter table booking_requests
add column if not exists qr_token_expires_at timestamptz;

alter table booking_requests
add column if not exists qr_scan_count int default 0;

alter table booking_requests
add column if not exists last_qr_scanned_at timestamptz;

alter table booking_requests
add column if not exists qr_status text default 'not_issued';

alter table booking_requests
add column if not exists enforcement_status text default 'not_started';

alter table booking_requests
add column if not exists auto_release_enabled boolean default true;

alter table booking_requests
add column if not exists host_verified_checkin boolean default false;

alter table booking_requests
add column if not exists host_verified_at timestamptz;

grant all on booking_requests to anon;
```
