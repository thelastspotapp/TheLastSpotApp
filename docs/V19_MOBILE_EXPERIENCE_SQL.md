# V19 Mobile Experience SQL

```sql
alter table user_profiles add column if not exists push_notifications_enabled boolean default true;

alter table user_profiles add column if not exists favorite_spots text[];

alter table user_profiles add column if not exists mobile_verified boolean default false;

alter table booking_requests add column if not exists mobile_booking boolean default true;

alter table booking_requests add column if not exists wallet_pass_enabled boolean default false;

grant all on user_profiles to anon;
grant all on booking_requests to anon;
```
