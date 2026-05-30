# V22 Real Authentication + Protected Accounts SQL

Run this in Supabase SQL Editor.

```sql
alter table user_profiles add column if not exists auth_user_id uuid;
alter table user_profiles add column if not exists auth_provider text default 'email';
alter table user_profiles add column if not exists last_login timestamptz;
alter table user_profiles add column if not exists account_status text default 'active';
alter table user_profiles add column if not exists is_admin boolean default false;
alter table user_profiles add column if not exists is_owner boolean default false;
alter table user_profiles add column if not exists is_renter boolean default true;

alter table booking_requests add column if not exists renter_email text;
alter table booking_requests add column if not exists owner_email text;
alter table booking_requests add column if not exists authenticated_booking boolean default false;

alter table host_submissions add column if not exists auth_user_id uuid;
alter table host_submissions add column if not exists submitted_by_email text;

alter table reviews add column if not exists authenticated_review boolean default false;
alter table reviews add column if not exists reviewer_role text;

grant all on user_profiles to anon;
grant all on booking_requests to anon;
grant all on host_submissions to anon;
grant all on reviews to anon;

update user_profiles
set is_admin = case when role = 'admin' then true else coalesce(is_admin, false) end,
    is_owner = case when role in ('owner', 'host') then true else coalesce(is_owner, false) end,
    is_renter = case when role = 'renter' then true else coalesce(is_renter, true) end;
```

Supabase Dashboard Setup Next:
1. Authentication → Providers → Enable Email.
2. Authentication → Providers → Enable Google.
3. Add your production URL as a redirect URL.
4. Later enable Apple when developer account is ready.
