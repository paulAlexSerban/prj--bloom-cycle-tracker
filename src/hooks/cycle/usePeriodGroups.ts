import { useMemo } from "react";
import { PeriodData } from "@/types/period";
import { isNextDay, toUtcDay } from "./utils";
import { PeriodGroup } from "./types";

export const usePeriodGroups = (data: PeriodData) =>
  useMemo(() => {
    const periodDays = Object.values(data.logs)
      .filter((log) => log.isPeriod)
      .map((log) => log.date)
      .sort();

    if (periodDays.length === 0) {
      return [] as PeriodGroup[];
    }

    const groups: PeriodGroup[] = [];

    let groupStart = periodDays[0];
    let lastDate = periodDays[0];

    for (let i = 1; i < periodDays.length; i++) {
      const date = periodDays[i];
      if (isNextDay(date, lastDate)) {
        lastDate = date;
        continue;
      }

      const length = toUtcDay(lastDate) - toUtcDay(groupStart) + 1;
      groups.push({ start: groupStart, end: lastDate, length });
      groupStart = date;
      lastDate = date;
    }

    const finalLength = toUtcDay(lastDate) - toUtcDay(groupStart) + 1;
    groups.push({ start: groupStart, end: lastDate, length: finalLength });

    return groups;
  }, [data.logs]);
