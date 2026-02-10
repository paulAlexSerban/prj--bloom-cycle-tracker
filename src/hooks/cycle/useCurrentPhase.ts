import { useMemo } from "react";
import { CyclePhase, PeriodData } from "@/types/period";
import { differenceInDays, addDays, startOfDay, parseISO, format } from "date-fns";

type CurrentPhaseParams = {
  lastPeriodStart: string | null;
  averageCycleLength: number;
  averagePeriodLength: number;
  logs: PeriodData["logs"];
};

export const useCurrentPhase = ({
  lastPeriodStart,
  averageCycleLength,
  averagePeriodLength,
  logs,
}: CurrentPhaseParams) =>
  useMemo((): CyclePhase | null => {
    if (!lastPeriodStart) return null;

    const today = startOfDay(new Date());
    const cycleDay = differenceInDays(today, parseISO(lastPeriodStart)) + 1;
    const nextPeriodDate = addDays(parseISO(lastPeriodStart), averageCycleLength);
    const daysUntilPeriod = differenceInDays(nextPeriodDate, today);

    const todayLog = logs[format(today, "yyyy-MM-dd")];
    if (todayLog?.isPeriod) {
      return {
        phase: "period",
        day: cycleDay,
        daysUntilPeriod: daysUntilPeriod > 0 ? daysUntilPeriod : 0,
      };
    }

    if (cycleDay <= averagePeriodLength) {
      return { phase: "period", day: cycleDay, daysUntilPeriod };
    }
    if (cycleDay <= 13) {
      return { phase: "follicular", day: cycleDay, daysUntilPeriod };
    }
    if (cycleDay <= 16) {
      return { phase: "ovulation", day: cycleDay, daysUntilPeriod };
    }
    return { phase: "luteal", day: cycleDay, daysUntilPeriod };
  }, [
    lastPeriodStart,
    averageCycleLength,
    averagePeriodLength,
    logs,
  ]);
