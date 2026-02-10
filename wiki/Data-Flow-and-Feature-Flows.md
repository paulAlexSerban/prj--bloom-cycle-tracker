# Data Flow and Feature Flows

## Global Data Flow
1) App mounts in src/main.tsx → src/App.tsx.
2) PeriodProvider loads LocalStorage data with usePeriodData.
3) useCycleCalculations derives cycle metrics from logs.
4) PeriodContext exposes data + derived values + actions to the UI.
5) UI components read/write via usePeriod().

## Feature Flows

### 1) Log Period Day (QuickLog)
- User taps “Log period” on Home.
- QuickLog calls togglePeriodDay(date).
- usePeriodData updates logs + rebuilds cycles.
- PeriodProvider triggers recalculation of averages, predictions, anomalies.

### 2) Log Detailed Day (DayLogEditor)
- User opens DayLogEditor from Home or Calendar.
- Editor updates local component state.
- On save → updateLog(date, partialLog).
- Logs update and cycles rebuild; derived values recalculate.

### 3) Calendar Predictions
- CycleCalendar uses isPredictedPeriod(), isInFertileWindow(), isOvulationDay().
- These helpers use last period start + averages from useCycleCalculations.
- UI renders predicted range, fertile window, ovulation day.

### 4) Current Phase Card
- CycleStatusCard uses currentPhase + nextPeriodDate.
- Phase is computed from last period start and average lengths.
- If today is logged as period, phase is forced to “period”.

### 5) Anomaly Alerts
- useCycleCalculations runs anomaly checks:
  - long/short cycles
  - missed period (overdue > 7 days)
  - heavy flow days > 3
- AnomalyAlerts displays top 3 with severity styling.

### 6) Pain Advice
- Advice uses today’s log to get painLevel.
- getAdviceForPainLevel() chooses tips; age-based tips are added.

### 7) Settings
- Profile updates (age, average cycle) use updateProfile().
- Theme toggle updates profile.theme; PeriodProvider applies theme to <html>.
- Export, import, and clear data actions are wired to usePeriodData.

## Calculation Summary
- averageCycleLength: mean of completed cycles; falls back to profile default.
- averagePeriodLength: mean of period group lengths; falls back to profile default.
- nextPeriodDate: lastPeriodStart + averageCycleLength.
- fertileWindow: days 10–17 after lastPeriodStart.
- ovulationDate: day 14 after lastPeriodStart.

## Error Handling
- LocalStorage errors are caught and logged; app still loads defaults.
- Import returns boolean success for UI handling.
