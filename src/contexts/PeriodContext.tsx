import { createContext, useContext, ReactNode, useEffect } from 'react';
import { usePeriodData } from '@/hooks/usePeriodData';
import { useCycleCalculations } from '@/hooks/useCycleCalculations';

type PeriodContextType = ReturnType<typeof usePeriodData> & ReturnType<typeof useCycleCalculations>;

const PeriodContext = createContext<PeriodContextType | null>(null);
let lastPeriodContextValue: PeriodContextType | null = null;

export function PeriodProvider({ children }: { children: ReactNode }) {
    const periodData = usePeriodData();
    const cycleCalculations = useCycleCalculations(periodData.data);

    useEffect(() => {
        const root = document.documentElement;
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = () => {
            const theme = periodData.data.profile.theme;
            const isDark = theme === 'dark' || (theme === 'system' && media.matches);
            root.classList.toggle('dark', isDark);
        };

        applyTheme();

        const handleChange = () => {
            if (periodData.data.profile.theme === 'system') {
                applyTheme();
            }
        };

        if (media.addEventListener) {
            media.addEventListener('change', handleChange);
        } else {
            media.addListener(handleChange);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', handleChange);
            } else {
                media.removeListener(handleChange);
            }
        };
    }, [periodData.data.profile.theme]);

    const value = {
        ...periodData,
        ...cycleCalculations,
    };

    lastPeriodContextValue = value;

    return (
        <PeriodContext.Provider value={value}>
            {periodData.isLoaded ? (
                children
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="animate-pulse-soft text-primary text-xl font-display">Loading...</div>
                </div>
            )}
        </PeriodContext.Provider>
    );
}

export function usePeriod() {
    const context = useContext(PeriodContext);
    if (context) return context;
    if (lastPeriodContextValue) return lastPeriodContextValue;
    throw new Error('usePeriod must be used within a PeriodProvider');
}
