# ADR-006: LocalStorage for Persistence

## Status
Accepted

## Date
2026-02-08

## Context
Local-only data storage is required, and the app must remain lightweight and offline-capable.

## Decision
Persist data using browser LocalStorage with export/import utilities for portability.

## Consequences
- Simple persistence without external dependencies.
- Storage size limits apply; large data sets may require future IndexedDB migration.
- Requires careful schema versioning for exports.
