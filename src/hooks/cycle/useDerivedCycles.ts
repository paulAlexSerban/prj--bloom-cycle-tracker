import { useMemo } from "react";
import { format, addDays, parseISO } from "date-fns";
import { PeriodGroup, DerivedCycle } from "./types";
import { toUtcDay } from "./utils";

export const useDerivedCycles = (periodGroups: PeriodGroup[]) =>
  useMemo(() => {
    if (periodGroups.length === 0) return [] as DerivedCycle[];

    const starts = periodGroups.map((group) => group.start);

    return starts.map((startDate, index) => {
      const nextStart = starts[index + 1];
      if (!nextStart) return { startDate };

      const length = toUtcDay(nextStart) - toUtcDay(startDate);
      return {
        startDate,
        endDate: format(addDays(parseISO(nextStart), -1), "yyyy-MM-dd"),
        length,
      };
    });
  }, [periodGroups]);
