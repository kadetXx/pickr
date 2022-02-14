import { getFirstdayOfMonth } from "./getIndexOfFirstDayOfMonth";
import { getDayData } from "./getDayData";
import { DayData } from "./getDayData";
import { getNumberOfDays } from "./getNumberOfDays";

export const getMonthData = (month: number, year: number) => {
  const totalBlocks: number = 42;
  const calendarDays: DayData[] = [];

  const firstDay = getFirstdayOfMonth(month, year);
  const numberOfDays = getNumberOfDays(month, year);

  for (let index = 0; index < totalBlocks; index++) {
    const currentDay = getDayData({
      index,
      month,
      year,
      firstDay: firstDay - 1, // added one to firstday because index starts at zero
      numberOfDays,
    });

    calendarDays.push(currentDay);
  }

  return {
    calendar: calendarDays,
    numberOfDays: numberOfDays,
  };
};
