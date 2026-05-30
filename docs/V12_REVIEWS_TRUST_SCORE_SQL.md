# V12 Reviews + Shore Trust Score SQL

Run this in Supabase SQL Editor:

```sql
-- V12 Reviews + Shore Trust Score

-- Already created in previous SQL, safe to rerun:
create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  full_name text,
  trust_score int default 80,
  verified boolean default false,
  total_bookings int default 0,
  repeat_guest_count int default 0,
  avg_rating numeric default 0,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid,
  reviewer_email text,
  reviewed_email text,
  review_type text,
  rating int,
  communication_rating int,
  accuracy_rating int,
  cleanliness_rating int,
  comment text,
  created_at timestamptz default now()
);

alter table user_profiles enable row level security;
alter table reviews enable row level security;

drop policy if exists "Allow public review inserts" on reviews;
create policy "Allow public review inserts"
on reviews
for insert
to anon
with check (true);

drop policy if exists "Allow public review reads" on reviews;
create policy "Allow public review reads"
on reviews
for select
to anon
using (true);

drop policy if exists "Allow public profile reads" on user_profiles;
create policy "Allow public profile reads"
on user_profiles
for select
to anon
using (true);

drop policy if exists "Allow public profile inserts" on user_profiles;
create policy "Allow public profile inserts"
on user_profiles
for insert
to anon
with check (true);

-- Make sure parking spot trust columns exist
alter table parking_spots add column if not exists trust_score int default 80;
alter table parking_spots add column if not exists verified_owner boolean default false;
alter table parking_spots add column if not exists total_reviews int default 0;
alter table parking_spots add column if not exists average_rating numeric default 0;

update parking_spots
set trust_score = coalesce(trust_score, 88),
    verified_owner = coalesce(verified_owner, true),
    average_rating = coalesce(average_rating, 4.8),
    total_reviews = coalesce(total_reviews, 1);

```
