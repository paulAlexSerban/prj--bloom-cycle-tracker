import { useMemo } from "react";
import { PeriodData } from "@/types/period";
import { DerivedCycle, PeriodGroup } from "./types";

type CycleAveragesParams = {
  derivedCycles: DerivedCycle[];
  periodGroups: PeriodGroup[];
  profile: PeriodData["profile"];
};

export const useCycleAverages = ({
  derivedCycles,
  periodGroups,
  profile,
}: CycleAveragesParams) => {
  const averageCycleLength = useMemo(() => {
    const completeCycles = derivedCycles.filter((c) => c.length && c.length > 0);
    if (completeCycles.length === 0) return profile.averageCycleLength;

    const sum = completeCycles.reduce((acc, c) => acc + (c.length || 0), 0);
    return Math.round(sum / completeCycles.length);
  }, [derivedCycles, profile.averageCycleLength]);

  const averagePeriodLength = useMemo(() => {
    if (periodGroups.length === 0) return profile.averagePeriodLength;
    const total = periodGroups.reduce((acc, group) => acc + group.length, 0);
    return Math.round(total / periodGroups.length);
  }, [periodGroups, profile.averagePeriodLength]);

  return { averageCycleLength, averagePeriodLength };
};
