# ADR-002: PWA-First Architecture

## Status
Accepted

## Date
2026-02-08

## Context
The product must be installable and work offline on mobile devices, while remaining lightweight and accessible.

## Decision
Deliver the app as a Progressive Web App (PWA) with offline support and mobile-friendly UI.

## Consequences
- Single-page application with service worker capabilities.
- Offline access for core features.
- Platform limitations for notifications on iOS.
