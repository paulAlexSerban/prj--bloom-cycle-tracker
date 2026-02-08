# ADR-007: GitHub Pages as Pre-Prod Environment

## Status
Accepted

## Date
2026-02-08

## Context
ASR-9 requires a staging/pre-prod environment for testing before production. Other ASRs emphasize a static, privacy-first, offline-capable PWA with no backend services (ASR-1, ASR-2, ASR-3, ASR-6). The deployment target should support static hosting, HTTPS, and easy CI/CD integration.

## Decision
Use GitHub Pages as the pre-production (staging) hosting environment for the PWA.

## Alternatives Considered
### 1) GitHub Pages (Chosen)
**Pros:**
- Native integration with GitHub repos and Actions.
- Static hosting fits PWA (no backend needed).
- Free and simple to maintain.
- HTTPS supported.

**Cons:**
- Limited to static hosting; no server-side capabilities.
- Fewer deployment previews and environment controls compared to specialized platforms.

### 2) Vercel
**Pros:**
- Excellent preview deployments and environment management.
- Fast global CDN.

**Cons:**
- Adds an external hosting dependency.
- More configuration overhead for a simple static pre-prod target.

### 3) Netlify
**Pros:**
- Simple static hosting with previews and build hooks.
- Good CDN and HTTPS out of the box.

**Cons:**
- External dependency and additional configuration.
- Extra platform to manage for a static-only pre-prod environment.

### 4) Firebase Hosting
**Pros:**
- Strong static hosting and CDN.
- Easy rollbacks and preview channels.

**Cons:**
- Requires Firebase project setup and credentials.
- More operational overhead than necessary for pre-prod.

### 5) AWS S3 + CloudFront
**Pros:**
- Highly scalable and configurable.

**Cons:**
- Most complex and highest operational overhead.
- Not aligned with lightweight needs for pre-prod.

## Consequences
- Pre-prod deployment is simple and aligned with the static PWA architecture.
- CI/CD can publish builds to GitHub Pages with minimal setup.
- If advanced preview environments are needed later, a move to Vercel/Netlify can be evaluated.
