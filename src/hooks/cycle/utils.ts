export const toUtcDay = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / 86400000;
};

export const isNextDay = (date: string, previousDate: string) =>
  toUtcDay(date) === toUtcDay(previousDate) + 1;
