# Architecturally Significant Requirements (ASR)

## Context
Bloom is a privacy-first period tracking PWA focused on local-only data storage, offline access, and personalized insights. These requirements materially shape the system architecture and technology choices.

## ASR-1: Privacy-First, Local-Only Data Storage
**Requirement:** All user data must remain on-device by default with no server-side persistence. Optional export/import is allowed.
**Architectural Impact:** Eliminates backend services and cloud databases; requires local persistence mechanisms and secure export/import flows.

## ASR-2: Offline-First Functionality
**Requirement:** Core features (logging, calendar, insights) must work offline.
**Architectural Impact:** Requires PWA capabilities and local computation for predictions/insights; no dependency on network services for core flows.

## ASR-3: Installable PWA on Mobile
**Requirement:** The app must be installable and behave like a mobile app on iOS/Android.
**Architectural Impact:** Favors a single-page PWA with service worker support and responsive UI design.

## ASR-4: Personalized Predictions from User History
**Requirement:** Cycle predictions must be based on the user’s historical data, not fixed assumptions.
**Architectural Impact:** Requires local analytics and data modeling in the client; no external ML services.

## ASR-5: Accessibility and Usability
**Requirement:** UI must be accessible and easy to use for daily logging.
**Architectural Impact:** Uses accessible component primitives and consistent design system.

## ASR-6: Lightweight and Fast UI
**Requirement:** The app must load quickly and feel responsive on mobile devices.
**Architectural Impact:** Uses a modern front-end toolchain and optimized component architecture.

## ASR-7: Platform Notification Constraints
**Requirement:** Reminders should use available PWA notifications, acknowledging iOS limitations.
**Architectural Impact:** Notification strategy must align with browser/OS capabilities; avoid reliance on unsupported push flows.

## ASR-8: Data Portability
**Requirement:** Users must be able to export/import their data for portability and medical consultations.
**Architectural Impact:** Requires a stable local data schema and export/import utilities.
