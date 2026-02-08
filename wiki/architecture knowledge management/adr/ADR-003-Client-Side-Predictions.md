# ADR-003: Client-Side Predictions and Insights

## Status
Accepted

## Date
2026-02-08

## Context
Predictions must be personalized using each user’s history, while preserving privacy and offline capability.

## Decision
Perform cycle calculations and insights entirely on the client, using locally stored data.

## Consequences
- No dependency on external analytics or ML services.
- Computation happens on-device; requires efficient algorithms.
- Prediction quality depends on user logging consistency.
