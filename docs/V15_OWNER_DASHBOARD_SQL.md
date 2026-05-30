# V15 Owner Dashboard SQL

```sql
alter table booking_requests add column if not exists payout_status text default 'pending';

alter table booking_requests add column if not exists payout_amount int default 0;

alter table parking_spots add column if not exists owner_email text;

alter table parking_spots add column if not exists earnings_total int default 0;

grant all on booking_requests to anon;
grant all on parking_spots to anon;
```
