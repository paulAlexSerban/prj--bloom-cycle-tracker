import { useCallback } from "react";
import { differenceInDays, isAfter, isBefore, isSameDay } from "date-fns";
import { FertileWindow } from "./types";

type PredictionChecksParams = {
  nextPeriodDate: Date | null;
  averagePeriodLength: number;
  fertileWindow: FertileWindow | null;
  ovulationDate: Date | null;
};

export const usePredictionChecks = ({
  nextPeriodDate,
  averagePeriodLength,
  fertileWindow,
  ovulationDate,
}: PredictionChecksParams) => {
  const isPredictedPeriod = useCallback(
    (date: Date): boolean => {
      if (!nextPeriodDate) return false;
      const dayDiff = differenceInDays(date, nextPeriodDate);
      return dayDiff >= 0 && dayDiff < averagePeriodLength;
    },
    [nextPeriodDate, averagePeriodLength],
  );

  const isInFertileWindow = useCallback(
    (date: Date): boolean => {
      if (!fertileWindow) return false;
      return !isBefore(date, fertileWindow.start) && !isAfter(date, fertileWindow.end);
    },
    [fertileWindow],
  );

  const isOvulationDay = useCallback(
    (date: Date): boolean => {
      if (!ovulationDate) return false;
      return isSameDay(date, ovulationDate);
    },
    [ovulationDate],
  );

  return { isPredictedPeriod, isInFertileWindow, isOvulationDay };
};
