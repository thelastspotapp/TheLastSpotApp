# V6 Admin Dashboard

This version adds a live booking request dashboard to the homepage.

Before testing the dashboard, run this Supabase policy:

create policy "Allow public reads on booking requests"
on booking_requests
for select
to anon
using (true);

Production note: this is open for MVP testing. Later we will add Supabase Auth and restrict this to admins only.
