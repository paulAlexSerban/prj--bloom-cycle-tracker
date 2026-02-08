# System and Solution Context Documentation (C4 Model – Level 1)

## System Context
**System Name:** Bloom Period Tracker

**Purpose:** A privacy-first period tracking PWA that enables users to log cycles and symptoms, view predictions, receive alerts and advice, and retain full control over their data locally.

## People (Primary Actors)
- **End User (Person who menstruates):** Logs periods/symptoms, reviews predictions and advice.
- **Healthcare Provider (Optional):** Receives exported data for consultation.

## External Systems
- **Device Storage (LocalStorage):** Primary data store on the user’s device.
- **PWA Runtime (Browser/OS):** Provides offline support and installation behavior.
- **Notification System (Browser/OS):** Schedules reminders/alarms (limited on iOS).

## System Interactions
- Users input period events and symptoms into Bloom.
- Bloom stores data locally and calculates predictions and insights.
- Users view calendar, alerts, and contextual advice.
- Users export data and share it with healthcare providers.

## C4 Level 1 Context Diagram (Textual)
- **User** → interacts with → **Bloom Period Tracker (PWA)**
- **Bloom Period Tracker** → reads/writes → **Local Device Storage**
- **Bloom Period Tracker** → uses → **Browser/OS PWA Services**
- **Bloom Period Tracker** → uses → **Browser/OS Notifications**
- **User** → exports data → **Healthcare Provider**

## Constraints and Notes
- Data remains on-device by default (privacy-first).
- PWA push notifications are limited on iOS.
- Not a diagnostic medical system; provides informational guidance only.
