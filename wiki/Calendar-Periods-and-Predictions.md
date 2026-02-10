# Calendar, Period Days, and Predictions

This document explains how the calendar renders status, how period days are set, and how predictions are calculated, with technical references to the implementation.

## 1) Calendar Rendering Pipeline

### Inputs
The calendar reads data and prediction helpers from the global period context.
- Context wiring: [src/contexts/PeriodContext.tsx](src/contexts/PeriodContext.tsx#L9-L60)
- Calendar component: [src/components/CycleCalendar.tsx](src/components/CycleCalendar.tsx#L24-L183)

### Per-day status resolution
For each day, the calendar computes a status object from logs and prediction helpers:
- Status computation: [src/components/CycleCalendar.tsx](src/components/CycleCalendar.tsx#L36-L48)

Status fields:
- `isPeriod`: log is marked as period.
- `isPredicted`: derived from `isPredictedPeriod(date)`.
- `isFertile`: derived from `isInFertileWindow(date)`.
- `isOvulation`: derived from `isOvulationDay(date)`.
- `hasLog`: any symptoms/mood/pain logged.
- `flowIntensity`: used to render intensity dots.

### Calendar styling rules
The status object drives the day cell styling:
- Primary day cell styling: [src/components/CycleCalendar.tsx](src/components/CycleCalendar.tsx#L86-L158)

Render priority is:
1) `isPeriod` (solid period color)
2) `isPredicted` (dashed border predicted style)
3) `isOvulation` (ovulation style)
4) `isFertile` (fertile window style)

Logged-symptom dots show for non-period days when `hasLog` is true.

## 2) Setting Period Days

### Quick toggle (Home)
The “Log period” button on Home toggles today as a period day.
- UI trigger: [src/components/QuickLog.tsx](src/components/QuickLog.tsx#L36-L47)
- Action: `togglePeriodDay(date)` in period data hook
  - Implementation: [src/hooks/usePeriodData.ts](src/hooks/usePeriodData.ts#L165-L186)

### Detailed day editing (Calendar + Home)
The modal editor sets or unsets `isPeriod` and other fields, then saves via `updateLog`.
- Editor state setup + save: [src/components/DayLogEditor.tsx](src/components/DayLogEditor.tsx#L15-L33)
- Period toggle in editor: [src/components/DayLogEditor.tsx](src/components/DayLogEditor.tsx#L63-L77)
- Save operation: `updateLog(date, partialLog)`
  - Implementation: [src/hooks/usePeriodData.ts](src/hooks/usePeriodData.ts#L98-L113)

### Data consequences
Every log update rebuilds cycles from period logs, ensuring predictions always derive from the latest log state.
- Cycle rebuild routine: [src/hooks/usePeriodData.ts](src/hooks/usePeriodData.ts#L30-L59)

## 3) Prediction Model

### Period grouping and cycle reconstruction
The model starts by grouping consecutive period days and deriving cycle lengths from group start dates.
- Grouping logic: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L13-L42)
- Derived cycles: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L44-L60)

### Averages
- Average cycle length: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L68-L75)
- Average period length: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L77-L82)

These are computed from historical completed cycles; if none exist, the profile defaults are used.

### Core prediction formulas
Let $L$ be `averageCycleLength`, $P$ be `averagePeriodLength`, and $S$ be `lastPeriodStart`.

- Next period start:
  - $\text{nextPeriodDate} = S + L$
  - Implementation: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L111-L115)

- Predicted period day window:
  - A date $d$ is predicted if $0 \le (d - \text{nextPeriodDate}) < P$
  - Implementation: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L131-L136)

- Fertile window (days 10–17):
  - $\text{start} = S + 9$, $\text{end} = S + 16$
  - Implementation: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L117-L123)

- Ovulation day (day 14):
  - $\text{ovulationDate} = S + 13$
  - Implementation: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L125-L129)

### Current phase
The current phase is inferred from cycle day and period logs:
- Phase calculation: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L84-L109)

If today is logged as period, it forces `phase = period` even if the cycle day falls outside the average period range.

## 4) End-to-end Flow Summary

1) User logs a period day (QuickLog or DayLogEditor).
2) `usePeriodData` updates logs and rebuilds cycles.
3) `useCycleCalculations` recomputes averages and predictions.
4) `CycleCalendar` re-renders with new status styling and predicted ranges.

Key references:
- Period context wiring: [src/contexts/PeriodContext.tsx](src/contexts/PeriodContext.tsx#L9-L60)
- Log update flow: [src/hooks/usePeriodData.ts](src/hooks/usePeriodData.ts#L98-L186)
- Prediction helpers: [src/hooks/useCycleCalculations.ts](src/hooks/useCycleCalculations.ts#L111-L148)
- Calendar rendering: [src/components/CycleCalendar.tsx](src/components/CycleCalendar.tsx#L86-L158)
