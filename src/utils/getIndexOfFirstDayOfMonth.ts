// returns the index of first weekday of the month (sunday = 0, monday = 1... etc)
export const getFirstdayOfMonth = (month: number, year: number): number => {
  return new Date(year, month).getDay();
};