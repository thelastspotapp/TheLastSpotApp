# V10 Vehicle Fit SQL

Run this in Supabase SQL Editor:

```sql
-- V10 Vehicle Fit + Access Details

alter table parking_spots add column if not exists vehicle_size text;
alter table parking_spots add column if not exists max_vehicle_length text;
alter table parking_spots add column if not exists height_restriction text;
alter table parking_spots add column if not exists fit_notes text;
alter table parking_spots add column if not exists covered_parking bool default false;
alter table parking_spots add column if not exists ev_charger bool default false;
alter table parking_spots add column if not exists oversized_allowed bool default false;
alter table parking_spots add column if not exists backing_in_required bool default false;
alter table parking_spots add column if not exists parallel_parking_only bool default false;

alter table host_submissions add column if not exists vehicle_size text;
alter table host_submissions add column if not exists max_vehicle_length text;
alter table host_submissions add column if not exists height_restriction text;
alter table host_submissions add column if not exists fit_notes text;
alter table host_submissions add column if not exists covered_parking bool default false;
alter table host_submissions add column if not exists ev_charger bool default false;
alter table host_submissions add column if not exists oversized_allowed bool default false;
alter table host_submissions add column if not exists backing_in_required bool default false;
alter table host_submissions add column if not exists parallel_parking_only bool default false;

-- Optional: add fit info to your existing sample spots
update parking_spots
set vehicle_size = 'SUV Friendly',
    max_vehicle_length = 'Up to 18 ft',
    height_restriction = 'No height restriction',
    fit_notes = 'Fits compact cars, sedans, and most SUVs.',
    covered_parking = false,
    ev_charger = false,
    oversized_allowed = false
where title = '2 Blocks From Beach';

update parking_spots
set vehicle_size = 'Full-Size Truck',
    max_vehicle_length = 'Up to 22 ft',
    height_restriction = 'No height restriction',
    fit_notes = 'Truck approved with easy pull-in access.',
    covered_parking = false,
    ev_charger = false,
    oversized_allowed = true
where title = 'Boardwalk Event Parking';

update parking_spots
set vehicle_size = 'Sedan',
    max_vehicle_length = 'Up to 16 ft',
    height_restriction = 'Low tree branches nearby',
    fit_notes = 'Best for compact cars and sedans. Tight fit for large SUVs.',
    covered_parking = false,
    ev_charger = false,
    oversized_allowed = false
where title = 'Cape May Cottage Spot';

```
