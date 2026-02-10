# Storage and Data Model

## Storage Strategy
- Local-only persistence using LocalStorage.
- Storage key: period-tracker-data.
- On load, data is parsed and merged with defaults to ensure schema completeness.
- On write, the entire PeriodData object is serialized.

## Data Model
Defined in src/types/period.ts.

### DayLog
Represents one calendar day.
- date: ISO date string (YYYY-MM-DD)
- isPeriod: boolean
- flowIntensity: light | medium | heavy | spotting
- painLevel: 1–5
- symptoms: Symptom[]
- mood: Mood
- notes: string
- stressLevel, weight, temperature: optional manual inputs

### PeriodData
Root container stored in LocalStorage.
- logs: Record<string, DayLog>
- cycles: CycleData[] (derived)
- profile: UserProfile

### UserProfile
- averageCycleLength (days)
- averagePeriodLength (days)
- reminderEnabled, reminderDaysBefore, dailyLogReminder, dailyLogReminderTime
- theme: light | dark | system
- age, name, lastUpdated

## Cycle Reconstruction
Cycles are rebuilt from logs on load and on log update:
- Period logs are grouped into contiguous sequences.
- Each group’s start becomes a cycle start.
- The next group’s start determines the previous cycle’s length.

## Import/Export
- Export: JSON blob download of PeriodData.
- Import: JSON parse + merge with defaults + cycle reconstruction.
- Clear: reset to defaults and clear LocalStorage.

## Date Normalization
Cycle grouping uses UTC day math to avoid timezone edge cases:
- Convert date to UTC day number
- “Next day” means +1 in UTC day units
