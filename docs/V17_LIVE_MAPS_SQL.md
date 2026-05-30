# V17 Live Maps + Geolocation SQL

```sql
alter table parking_spots add column if not exists latitude numeric;

alter table parking_spots add column if not exists longitude numeric;

alter table parking_spots add column if not exists near_beach boolean default false;

alter table parking_spots add column if not exists walking_distance text;

alter table parking_spots add column if not exists premium_zone boolean default false;

alter table parking_spots add column if not exists geo_verified boolean default false;

grant all on parking_spots to anon;
```
