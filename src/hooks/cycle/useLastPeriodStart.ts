import { useMemo } from "react";
import { PeriodGroup } from "./types";

export const useLastPeriodStart = (periodGroups: PeriodGroup[]) =>
  useMemo(() => {
    if (periodGroups.length === 0) return null;
    return periodGroups[periodGroups.length - 1].start;
  }, [periodGroups]);
