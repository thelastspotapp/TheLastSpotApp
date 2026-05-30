# V25 Live Occupancy Heatmaps SQL

```sql
alter table parking_spots add column if not exists occupancy_level int default 50;
alter table parking_spots add column if not exists congestion_zone text default 'moderate';
alter table parking_spots add column if not exists live_heat_score int default 50;
alter table parking_spots add column if not exists occupancy_updated_at timestamptz default now();

grant all on parking_spots to anon;
```
