# Codebase Overview

## Purpose
Bloom is a local-first period tracking PWA. All data stays in the browser (LocalStorage). The UI is a mobile-first single-page app built with React + TypeScript + Vite + Tailwind.

## Runtime Architecture
- Entry: React app mounts in src/main.tsx and renders the router in src/App.tsx.
- Providers:
  - QueryClientProvider (React Query) wraps the app.
  - TooltipProvider for shared UI tooltips.
  - PeriodProvider exposes data + calculations to the entire app.
- Routing (React Router):
  - / -> Home (dashboard + quick actions)
  - /calendar -> CalendarPage (month view + day editor)
  - /insights -> Insights (stats + anomaly alerts)
  - /advice -> Advice (pain relief tips)
  - /settings -> Settings (profile + theme + data export/clear)

## Key Modules
- src/contexts/PeriodContext.tsx
  - Combines storage state (usePeriodData) and derived calculations (useCycleCalculations).
  - Applies theme based on user profile + system preference.
- src/hooks/usePeriodData.ts
  - LocalStorage persistence for all logs/profile data.
  - CRUD helpers for day logs and profile.
  - Export/import and clear operations.
- src/hooks/useCycleCalculations.ts
  - Derives cycles, phases, predictions, fertile window, ovulation, and anomalies.

## UI Composition
- Core Pages:
  - Home: CycleStatusCard + QuickLog + AnomalyAlerts.
  - CalendarPage: CycleCalendar + DayLogEditor.
  - Insights: aggregate stats + AnomalyAlerts.
  - Advice: pain advice based on today’s pain level and age.
  - Settings: profile, theme, export/clear data.
- Core Components:
  - CycleStatusCard: current phase + next period info.
  - QuickLog: toggle today’s period and quick symptoms.
  - DayLogEditor: full day detail modal.
  - CycleCalendar: month grid with prediction/phase highlights.
  - AnomalyAlerts: renders detected anomalies.
  - BottomNav: fixed navigation tabs.

## External Libraries
- react-router-dom: client-side routing.
- date-fns: date arithmetic and formatting.
- lucide-react: iconography.
- @tanstack/react-query: data query client (mostly for future growth; current usage is just provider).
- Tailwind CSS + Radix UI (via shadcn/ui components).

## Conventions
- All dates are stored as ISO strings: YYYY-MM-DD.
- LocalStorage key: period-tracker-data.
- Data is derived from logs rather than being hand-edited (cycles are rebuilt from logs).
