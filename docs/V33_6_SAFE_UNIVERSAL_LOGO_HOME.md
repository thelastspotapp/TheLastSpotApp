# V33.6 Safe Universal Logo Home

No SQL required.

Fixes:
- Starts from the stable V33.2 mobile exit build
- Adds universal logo/home behavior safely with a document click handler
- Does not reference `goHome` from Nav or any out-of-scope component
- Closes menu, notifications, spot modal, review modal, and admin message when clicking any #top logo/home link
- Returns to the homepage/top
