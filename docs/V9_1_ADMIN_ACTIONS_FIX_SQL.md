# V9.1 Admin Actions Fix SQL

Run this in Supabase SQL Editor if approve/decline buttons do not update status:

```sql
-- V9.1 Admin status update troubleshooting SQL

-- Make sure anon can update both tables during MVP testing.
grant usage on schema public to anon;
grant select, insert, update on booking_requests to anon;
grant select, insert, update on host_submissions to anon;

drop policy if exists "Allow public updates on booking requests" on booking_requests;
create policy "Allow public updates on booking requests"
on booking_requests
for update
to anon
using (true)
with check (true);

drop policy if exists "Allow public updates on host submissions" on host_submissions;
create policy "Allow public updates on host submissions"
on host_submissions
for update
to anon
using (true)
with check (true);

```
