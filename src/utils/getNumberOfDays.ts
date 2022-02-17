// returns the total number of days in the month
export const getNumberOfDays = (month: number, year: number): number => {
  const range = 40;
  const nextMonthSpilledDays = new Date(year, month, range).getDate();
  const currentMonthNumberOfDays = range - nextMonthSpilledDays;

  return currentMonthNumberOfDays;
};