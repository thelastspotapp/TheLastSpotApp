# V7 Host Portal SQL

Run this in Supabase SQL Editor:

create table host_submissions (
  id uuid primary key default gen_random_uuid(),
  host_name text,
  host_email text,
  host_phone text,
  spot_title text,
  town text,
  address text,
  daily_price int8,
  weekly_price int8,
  monthly_price int8,
  description text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table host_submissions enable row level security;

create policy "Allow public inserts on host submissions"
on host_submissions
for insert
to anon
with check (true);

create policy "Allow public reads on host submissions"
on host_submissions
for select
to anon
using (true);
