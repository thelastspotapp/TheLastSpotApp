create table users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  phone text,
  role text check (role in ('renter','host','admin')),
  created_at timestamptz default now()
);

create table parking_spots (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references users(id),
  title text,
  town text,
  address text,
  daily_price numeric,
  weekly_price numeric,
  monthly_price numeric,
  status text default 'pending',
  verified boolean default false,
  created_at timestamptz default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid references parking_spots(id),
  user_id uuid references users(id),
  starts_at timestamptz,
  ends_at timestamptz,
  status text default 'reserved',
  payment_status text default 'pending',
  created_at timestamptz default now()
);

create table qr_scans (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id),
  scan_type text check (scan_type in ('check_in','check_out')),
  scanned_at timestamptz default now(),
  lat numeric,
  lng numeric
);
