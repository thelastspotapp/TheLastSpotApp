# V20 Real Maps + Navigation SQL

```sql
alter table parking_spots add column if not exists map_place_id text;

alter table parking_spots add column if not exists formatted_address text;

alter table parking_spots add column if not exists beach_distance_miles numeric;

alter table parking_spots add column if not exists boardwalk_distance_miles numeric;

alter table parking_spots add column if not exists walking_time_minutes int;

alter table parking_spots add column if not exists directions_url text;

alter table parking_spots add column if not exists map_pin_label text;

alter table parking_spots add column if not exists zone_type text default 'standard';

grant all on parking_spots to anon;

-- Optional sample geo data
update parking_spots
set near_beach = true,
    walking_distance = coalesce(walking_distance, '3 min walk'),
    beach_distance_miles = coalesce(beach_distance_miles, 0.2),
    boardwalk_distance_miles = coalesce(boardwalk_distance_miles, 0.3),
    walking_time_minutes = coalesce(walking_time_minutes, 3),
    map_pin_label = coalesce(map_pin_label, '$25'),
    zone_type = coalesce(zone_type, 'beach')
where title = '2 Blocks From Beach';

update parking_spots
set near_beach = true,
    walking_distance = coalesce(walking_distance, '6 min walk'),
    beach_distance_miles = coalesce(beach_distance_miles, 0.4),
    boardwalk_distance_miles = coalesce(boardwalk_distance_miles, 0.1),
    walking_time_minutes = coalesce(walking_time_minutes, 6),
    map_pin_label = coalesce(map_pin_label, '$40'),
    zone_type = coalesce(zone_type, 'event')
where title = 'Boardwalk Event Parking';

update parking_spots
set near_beach = true,
    walking_distance = coalesce(walking_distance, '7 min walk'),
    beach_distance_miles = coalesce(beach_distance_miles, 0.5),
    boardwalk_distance_miles = coalesce(boardwalk_distance_miles, 0.6),
    walking_time_minutes = coalesce(walking_time_minutes, 7),
    map_pin_label = coalesce(map_pin_label, '$35'),
    zone_type = coalesce(zone_type, 'historic')
where title = 'Cape May Cottage Spot';
```

# Future Vercel Environment Variable

When ready for actual Google Maps rendering, add:

```text
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

Or for Mapbox:

```text
NEXT_PUBLIC_MAPBOX_TOKEN
```
