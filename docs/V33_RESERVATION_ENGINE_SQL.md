# V33 Reservation State Engine SQL

```sql
alter table booking_requests
add column if not exists reservation_state text default 'available';

alter table booking_requests
add column if not exists reservation_hold_expires_at timestamptz;

alter table booking_requests
add column if not exists checked_in_at timestamptz;

alter table booking_requests
add column if not exists reservation_qr_token text;

alter table booking_requests
add column if not exists reservation_locked boolean default false;

alter table booking_requests
add column if not exists emergency_closed boolean default false;

alter table booking_requests
add column if not exists dynamic_event_price numeric;

grant all on booking_requests to anon;
```
