// get first day
export const getFirstdayOfMonth = (month: number, year: number): number => {
  return new Date(year, month).getDay();
};