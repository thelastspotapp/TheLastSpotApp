# V18 QR Check-In SQL

```sql
alter table booking_requests add column if not exists qr_verified boolean default false;

alter table booking_requests add column if not exists checked_in_at timestamptz;

alter table booking_requests add column if not exists checked_out_at timestamptz;

alter table booking_requests add column if not exists qr_scan_count int default 0;

alter table parking_spots add column if not exists qr_enabled boolean default true;

alter table parking_spots add column if not exists printable_sign_url text;

grant all on booking_requests to anon;
grant all on parking_spots to anon;
```
