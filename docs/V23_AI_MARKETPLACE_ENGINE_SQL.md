# V23 AI Marketplace Engine SQL

```sql
alter table parking_spots add column if not exists ai_recommended_price int default 25;
alter table parking_spots add column if not exists ai_demand_score int default 50;
alter table parking_spots add column if not exists ai_occupancy_forecast int default 60;
alter table parking_spots add column if not exists ai_revenue_projection int default 0;
alter table parking_spots add column if not exists ai_surge_reason text;
alter table parking_spots add column if not exists ai_last_updated timestamptz default now();

alter table booking_requests add column if not exists ai_booking_score int default 50;
alter table booking_requests add column if not exists ai_risk_score int default 10;
alter table booking_requests add column if not exists ai_trust_recommendation text;

grant all on parking_spots to anon;
grant all on booking_requests to anon;
```
