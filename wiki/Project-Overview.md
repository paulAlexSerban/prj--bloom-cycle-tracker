# Project Overview Documentation

## Project Purpose
Build a privacy-first period tracking PWA that provides cycle logging, predictions, symptom insights, and practical guidance while keeping data local to the device.

## Scope
**In Scope (MVP):**
- Period logging with flow intensity.
- Symptom tracking and contextual advice.
- Personalized cycle predictions.
- Calendar visualization and anomaly alerts.
- Reminders/alarms for key actions.
- Local data storage with export/import.
- Installable PWA with offline support.
- Light/dark UI themes.

**Out of Scope (MVP):**
- Native smartwatch integrations.
- Deep health platform integrations (Apple Health/Google Fit).
- Real-time push notifications on iOS (limited by PWA constraints).

## Tech Stack
- React + TypeScript (UI and business logic)
- Vite (build tooling)
- Tailwind CSS (styling)
- Radix UI (accessible UI components)
- LocalStorage (data persistence)

## Architecture Summary
- Single-page PWA.
- Local-first data model and calculations.
- Export/import for portability and backup.

## Milestones
1. MVP foundations (logging, calendar, predictions, symptoms).
2. Privacy and portability (local data + export/import).
3. UX polish (alerts, advice, reminders, theming).
4. Post-MVP discovery (insights, integrations, advanced visualizations).

## Risks and Assumptions
- Assumes users are comfortable with local-only storage for privacy.
- Prediction quality depends on consistent user inputs.
- PWA notification limitations on iOS may reduce reminder effectiveness.

## Definition of Done (MVP)
- Core features implemented with stable local persistence.
- Offline-capable and installable on mobile devices.
- Accessibility-friendly UI components.
- Clear privacy posture and export/import support.
