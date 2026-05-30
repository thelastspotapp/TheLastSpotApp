# V9 Admin Actions SQL

Run this in Supabase SQL Editor:

```sql
-- V9 Admin action permissions for MVP testing
create policy "Allow public updates on booking requests"
on booking_requests
for update
to anon
using (true)
with check (true);

create policy "Allow public updates on host submissions"
on host_submissions
for update
to anon
using (true)
with check (true);

```
