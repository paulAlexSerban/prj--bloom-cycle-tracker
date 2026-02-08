# ADR-001: Local-Only Data Storage

## Status
Accepted

## Date
2026-02-08

## Context
Bloom prioritizes user privacy. The product scope and stakeholder expectations require that sensitive health data remains on the user’s device.

## Decision
Store all user data locally on the device by default. Provide export/import to support portability and sharing with healthcare providers.

## Consequences
- No backend database or user accounts in MVP.
- Requires local persistence and stable data schema.
- Limits cross-device sync until a future opt-in service is introduced.
