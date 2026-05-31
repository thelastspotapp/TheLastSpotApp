# V27 Host Analytics Dashboard SQL

```sql
alter table user_profiles add column if not exists monthly_revenue numeric default 0;
alter table user_profiles add column if not exists lifetime_revenue numeric default 0;
alter table user_profiles add column if not exists occupancy_rate int default 0;
alter table user_profiles add column if not exists ai_host_score int default 50;
alter table user_profiles add column if not exists repeat_renter_count int default 0;
alter table user_profiles add column if not exists premium_host boolean default false;

grant all on user_profiles to anon;
```
