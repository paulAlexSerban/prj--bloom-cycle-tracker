import { useState, useEffect, useCallback } from 'react';
import { PeriodData, DayLog, UserProfile, CycleData } from '@/types/period';
import { format, parseISO, differenceInDays, addDays } from 'date-fns';

const STORAGE_KEY = 'period-tracker-data';

const defaultProfile: UserProfile = {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    lastUpdated: new Date().toISOString(),
    reminderEnabled: true,
    reminderDaysBefore: 3,
    dailyLogReminder: false,
    theme: 'system',
};

const defaultData: PeriodData = {
    logs: {},
    cycles: [],
    profile: defaultProfile,
};

const toUtcDay = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    return Date.UTC(year, month - 1, day) / 86400000;
};

const isNextDay = (date: string, previousDate: string) => toUtcDay(date) === toUtcDay(previousDate) + 1;

const buildCyclesFromLogs = (logs: Record<string, DayLog>): CycleData[] => {
    const periodDates = Object.values(logs)
        .filter((log) => log.isPeriod)
        .map((log) => log.date)
        .sort();

    if (periodDates.length === 0) return [];

    const groupStarts: string[] = [];
    let lastDate: string | null = null;

    for (const date of periodDates) {
        if (!lastDate || !isNextDay(date, lastDate)) {
            groupStarts.push(date);
        }
        lastDate = date;
    }

    return groupStarts.map((startDate, index) => {
        const nextStart = groupStarts[index + 1];
        if (!nextStart) return { startDate };

        const length = toUtcDay(nextStart) - toUtcDay(startDate);
        return {
            startDate,
            endDate: format(addDays(parseISO(nextStart), -1), 'yyyy-MM-dd'),
            length,
        };
    });
};

export function usePeriodData() {
    const [data, setData] = useState<PeriodData>(defaultData);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const logs = parsed.logs ?? defaultData.logs;
                const cycles = buildCyclesFromLogs(logs);
                setData({
                    ...defaultData,
                    ...parsed,
                    logs,
                    cycles,
                    profile: { ...defaultProfile, ...parsed.profile },
                });
            }
        } catch (error) {
            console.error('Error loading period data:', error);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error('Error saving period data:', error);
            }
        }
    }, [data, isLoaded]);

    const updateLog = useCallback((date: string, log: Partial<DayLog>) => {
        setData((prev) => {
            const existingLog = prev.logs[date] || { date, isPeriod: false, symptoms: [] };
            const updatedLog = { ...existingLog, ...log, date };

            const updatedLogs = {
                ...prev.logs,
                [date]: updatedLog,
            };

            return {
                ...prev,
                logs: updatedLogs,
                cycles: buildCyclesFromLogs(updatedLogs),
            };
        });
    }, []);

    const getLog = useCallback(
        (date: string): DayLog | undefined => {
            return data.logs[date];
        },
        [data.logs]
    );

    const updateProfile = useCallback((profile: Partial<UserProfile>) => {
        setData((prev) => ({
            ...prev,
            profile: { ...prev.profile, ...profile, lastUpdated: new Date().toISOString() },
        }));
    }, []);

    const startPeriod = useCallback((date: string) => {
        setData((prev) => {
            const updatedLogs = {
                ...prev.logs,
                [date]: { ...prev.logs[date], date, isPeriod: true, symptoms: prev.logs[date]?.symptoms || [] },
            };

            return {
                ...prev,
                logs: updatedLogs,
                cycles: buildCyclesFromLogs(updatedLogs),
            };
        });
    }, []);

    const endPeriod = useCallback((date: string) => {
        setData((prev) => {
            const updatedLogs = {
                ...prev.logs,
                [date]: {
                    ...prev.logs[date],
                    date,
                    isPeriod: true,
                    symptoms: prev.logs[date]?.symptoms || [],
                },
            };

            return {
                ...prev,
                logs: updatedLogs,
                cycles: buildCyclesFromLogs(updatedLogs),
            };
        });
    }, []);

    const togglePeriodDay = useCallback((date: string) => {
        setData((prev) => {
            const existingLog = prev.logs[date];
            const isPeriod = !(existingLog?.isPeriod ?? false);

            const updatedLogs = {
                ...prev.logs,
                [date]: {
                    ...existingLog,
                    date,
                    isPeriod,
                    symptoms: existingLog?.symptoms || [],
                    flowIntensity: isPeriod ? existingLog?.flowIntensity || 'medium' : undefined,
                },
            };

            return {
                ...prev,
                logs: updatedLogs,
                cycles: buildCyclesFromLogs(updatedLogs),
            };
        });
    }, []);

    const exportData = useCallback(() => {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `period-tracker-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [data]);

    const importData = useCallback((jsonData: string) => {
        try {
            const parsed = JSON.parse(jsonData);
            const logs = parsed.logs ?? defaultData.logs;
            const cycles = buildCyclesFromLogs(logs);
            setData({
                ...defaultData,
                ...parsed,
                logs,
                cycles,
                profile: { ...defaultProfile, ...parsed.profile },
            });
            return true;
        } catch {
            return false;
        }
    }, []);

    const clearAllData = useCallback(() => {
        setData(defaultData);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        data,
        isLoaded,
        updateLog,
        getLog,
        updateProfile,
        startPeriod,
        endPeriod,
        togglePeriodDay,
        exportData,
        importData,
        clearAllData,
    };
}
