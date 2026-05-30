# V8 Owner Verification SQL

Run this in Supabase SQL Editor:

```sql
create table if not exists host_submissions (
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
  verification_method text,
  owner_attestation bool default false,
  document_note text,
  photo_note text,
  status text default 'pending_verification',
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

-- If you already created host_submissions in V7, run these instead:
alter table host_submissions add column if not exists verification_method text;
alter table host_submissions add column if not exists owner_attestation bool default false;
alter table host_submissions add column if not exists document_note text;
alter table host_submissions add column if not exists photo_note text;
alter table host_submissions alter column status set default 'pending_verification';

```
