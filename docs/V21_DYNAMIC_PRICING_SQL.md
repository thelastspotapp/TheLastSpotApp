# V21 Dynamic Pricing SQL

```sql
alter table parking_spots add column if not exists base_price int default 25;

alter table parking_spots add column if not exists dynamic_price int default 25;

alter table parking_spots add column if not exists weekend_multiplier numeric default 1.2;

alter table parking_spots add column if not exists event_multiplier numeric default 1.3;

alter table parking_spots add column if not exists weather_multiplier numeric default 1.0;

alter table parking_spots add column if not exists occupancy_multiplier numeric default 1.0;

alter table parking_spots add column if not exists trust_multiplier numeric default 1.0;

alter table parking_spots add column if not exists pricing_strategy text default 'dynamic';

alter table parking_spots add column if not exists surge_active boolean default false;

grant all on parking_spots to anon;

-- Sample premium pricing
update parking_spots
set dynamic_price = 45,
    surge_active = true
where zone_type = 'event';

update parking_spots
set dynamic_price = 35
where zone_type = 'beach';
```
