# V60.10 Phone Landscape Breakpoint Fix

No SQL required.

Fixes:
- Desktop nav no longer appears at the `md` breakpoint.
- Desktop nav now waits until `lg`, so phones in landscape still use the mobile menu.
- This prevents Explore/Host pills from appearing simply because the phone is rotated.
- Keeps single mobile menu system from V60.9.
