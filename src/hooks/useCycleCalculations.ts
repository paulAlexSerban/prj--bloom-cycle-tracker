import { PeriodData } from "@/types/period";
import { useCycleAverages } from "./cycle/useCycleAverages";
import { useCycleAnomalies } from "./cycle/useCycleAnomalies";
import { useCyclePredictions } from "./cycle/useCyclePredictions";
import { useCurrentPhase } from "./cycle/useCurrentPhase";
import { useDerivedCycles } from "./cycle/useDerivedCycles";
import { useLastPeriodStart } from "./cycle/useLastPeriodStart";
import { usePeriodGroups } from "./cycle/usePeriodGroups";
import { usePredictionChecks } from "./cycle/usePredictionChecks";

export function useCycleCalculations(data: PeriodData) {
  const periodGroups = usePeriodGroups(data);
  const derivedCycles = useDerivedCycles(periodGroups);
  const lastPeriodStart = useLastPeriodStart(periodGroups);
  const { averageCycleLength, averagePeriodLength } = useCycleAverages({
    derivedCycles,
    periodGroups,
    profile: data.profile,
  });
  const currentPhase = useCurrentPhase({
    lastPeriodStart,
    averageCycleLength,
    averagePeriodLength,
    logs: data.logs,
  });
  const { nextPeriodDate, fertileWindow, ovulationDate } =
    useCyclePredictions({
      lastPeriodStart,
      averageCycleLength,
    });
  const { isPredictedPeriod, isInFertileWindow, isOvulationDay } =
    usePredictionChecks({
      nextPeriodDate,
      averagePeriodLength,
      fertileWindow,
      ovulationDate,
    });
  const anomalies = useCycleAnomalies({
    derivedCycles,
    logs: data.logs,
    nextPeriodDate,
    currentPhase,
  });

  return {
    lastPeriodStart,
    averageCycleLength,
    averagePeriodLength,
    currentPhase,
    nextPeriodDate,
    fertileWindow,
    ovulationDate,
    isPredictedPeriod,
    isInFertileWindow,
    isOvulationDay,
    anomalies,
  };
}
