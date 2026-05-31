# V47 Live Session Integration

No SQL required if Phase 47 SQL has already been run.

Connects UI actions to Supabase tables:
- parking_sessions
- parking_incidents
- session_activity
- host_alerts

Visible behavior:
- Start Session inserts parking_sessions row
- Extend 1 Hour logs session_activity
- Extend 2 Hours logs session_activity
- Grace Period logs session_activity and host_alerts
- Report Spot Occupied inserts parking_incidents and host_alerts

Note:
This is the first live wiring layer. Later phases can calculate live countdowns, update end_time directly, and stream ticker activity from session_activity.
