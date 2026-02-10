import { useMemo } from "react";
import { differenceInDays, format, parseISO } from "date-fns";
import { Anomaly, CyclePhase, PeriodData } from "@/types/period";
import { DerivedCycle } from "./types";

type CycleAnomaliesParams = {
  derivedCycles: DerivedCycle[];
  logs: PeriodData["logs"];
  nextPeriodDate: Date | null;
  currentPhase: CyclePhase | null;
};

export const useCycleAnomalies = ({
  derivedCycles,
  logs,
  nextPeriodDate,
  currentPhase,
}: CycleAnomaliesParams) =>
  useMemo((): Anomaly[] => {
    const detected: Anomaly[] = [];

    derivedCycles.forEach((cycle) => {
      if (cycle.length && cycle.length > 35) {
        detected.push({
          type: "long_cycle",
          message: `Your cycle starting ${format(parseISO(cycle.startDate), "MMM d")} was ${cycle.length} days - longer than typical (21-35 days).`,
          severity: "warning",
          date: cycle.startDate,
        });
      }
      if (cycle.length && cycle.length < 21) {
        detected.push({
          type: "short_cycle",
          message: `Your cycle starting ${format(parseISO(cycle.startDate), "MMM d")} was ${cycle.length} days - shorter than typical (21-35 days).`,
          severity: "warning",
          date: cycle.startDate,
        });
      }
    });

    if (nextPeriodDate && currentPhase) {
      const daysOverdue = differenceInDays(new Date(), nextPeriodDate);
      if (daysOverdue > 7) {
        detected.push({
          type: "missed_period",
          message: `Your period is ${daysOverdue} days late. Consider taking a pregnancy test or consulting a doctor if this is unusual for you.`,
          severity: "alert",
        });
      }
    }

    const heavyFlowDays = Object.values(logs).filter(
      (log) => log.isPeriod && log.flowIntensity === "heavy",
    ).length;

    if (heavyFlowDays > 3) {
      detected.push({
        type: "heavy_flow",
        message: `You've logged ${heavyFlowDays} days of heavy flow. If this is unusual, consider speaking with a healthcare provider.`,
        severity: "info",
      });
    }

    return detected;
  }, [derivedCycles, logs, nextPeriodDate, currentPhase]);
