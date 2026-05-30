# V13 Auth-Ready Profiles SQL

Run this in Supabase SQL Editor:

```sql
-- V13 Auth-Ready Profiles + Roles

alter table user_profiles add column if not exists role text default 'renter';
alter table user_profiles add column if not exists phone text;
alter table user_profiles add column if not exists verification_status text default 'unverified';
alter table user_profiles add column if not exists cancellation_count int default 0;
alter table user_profiles add column if not exists dispute_count int default 0;
alter table user_profiles add column if not exists response_time_minutes int default 0;

alter table user_profiles enable row level security;

grant select, insert, update on user_profiles to anon;

drop policy if exists "Allow public profile inserts" on user_profiles;
create policy "Allow public profile inserts"
on user_profiles
for insert
to anon
with check (true);

drop policy if exists "Allow public profile reads" on user_profiles;
create policy "Allow public profile reads"
on user_profiles
for select
to anon
using (true);

drop policy if exists "Allow public profile updates" on user_profiles;
create policy "Allow public profile updates"
on user_profiles
for update
to anon
using (true)
with check (true);

-- Optional starter admin profile. Edit email/name as needed.
insert into user_profiles (
  email,
  full_name,
  role,
  trust_score,
  verified,
  verification_status
)
values (
  'thelastspotapp@gmail.com',
  'The Last Spot Admin',
  'admin',
  100,
  true,
  'verified'
)
on conflict (email) do update
set role = excluded.role,
    trust_score = excluded.trust_score,
    verified = excluded.verified,
    verification_status = excluded.verification_status;

```
