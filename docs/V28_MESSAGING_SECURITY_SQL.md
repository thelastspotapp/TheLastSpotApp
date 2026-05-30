# V28 Messaging + Secure Access SQL

```sql
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid,
  sender_role text,
  sender_name text,
  message_text text,
  created_at timestamptz default now(),
  sensitive_message boolean default false,
  expires_at timestamptz,
  access_code text,
  access_code_expired boolean default false
);

alter table booking_requests add column if not exists secure_access_enabled boolean default false;
alter table booking_requests add column if not exists qr_access_token text;
alter table booking_requests add column if not exists access_expires_at timestamptz;

grant all on messages to anon;
grant all on booking_requests to anon;
```
