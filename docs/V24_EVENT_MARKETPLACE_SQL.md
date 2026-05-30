# V24 Event Marketplace SQL

```sql
alter table parking_spots add column if not exists event_name text;
alter table parking_spots add column if not exists event_date timestamptz;
alter table parking_spots add column if not exists event_zone boolean default false;
alter table parking_spots add column if not exists event_capacity int default 0;
alter table parking_spots add column if not exists event_surge_multiplier numeric default 1.0;
alter table parking_spots add column if not exists local_event_score int default 50;

grant all on parking_spots to anon;
```
