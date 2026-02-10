export type PeriodGroup = { start: string; end: string; length: number };

export type DerivedCycle = {
  startDate: string;
  endDate?: string;
  length?: number;
};

export type FertileWindow = { start: Date; end: Date };
