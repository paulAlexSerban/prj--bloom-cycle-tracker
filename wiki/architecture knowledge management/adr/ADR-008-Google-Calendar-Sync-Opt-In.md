# ADR-008: Google Calendar Sync (Opt-In)

## Status
Proposed

## Date
2026-02-10

## Context
Users want cycle events to appear in Google Calendar and to receive calendar-based notifications. The product is privacy-first and currently local-only, so any external sync must be explicit, minimal, and reversible.

## Decision
Introduce an optional, user-controlled Google Calendar sync using OAuth. Sync will create/update calendar events for period, predicted period, fertile window, and ovulation days. The app will also read existing Google Calendar events tagged as period-related to backfill logs into the app.

## Consequences
- Requires OAuth consent flow and secure token storage.
- Needs a sync engine with conflict resolution and idempotent event mapping.
- Must define event metadata (e.g., tags in description/extended properties) for round-trip sync.
- Adds dependency on Google API quotas and availability.
- Privacy posture remains opt-in; local-only behavior is preserved when disabled.
