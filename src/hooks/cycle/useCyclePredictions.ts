import { useMemo } from "react";
import { addDays, parseISO } from "date-fns";
import { FertileWindow } from "./types";

type CyclePredictionsParams = {
  lastPeriodStart: string | null;
  averageCycleLength: number;
};

export const useCyclePredictions = ({
  lastPeriodStart,
  averageCycleLength,
}: CyclePredictionsParams) => {
  const nextPeriodDate = useMemo(() => {
    if (!lastPeriodStart) return null;
    return addDays(parseISO(lastPeriodStart), averageCycleLength);
  }, [lastPeriodStart, averageCycleLength]);

  const fertileWindow = useMemo(() => {
    if (!lastPeriodStart) return null as FertileWindow | null;
    const start = addDays(parseISO(lastPeriodStart), 9);
    const end = addDays(parseISO(lastPeriodStart), 16);
    return { start, end };
  }, [lastPeriodStart]);

  const ovulationDate = useMemo(() => {
    if (!lastPeriodStart) return null;
    return addDays(parseISO(lastPeriodStart), 13);
  }, [lastPeriodStart]);

  return { nextPeriodDate, fertileWindow, ovulationDate };
};
