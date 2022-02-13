import type { Day } from "../constants";
import { getFirstdayOfMonth } from "./getIndexOfFirstDayOfMonth";
import { getDayData } from "./getDayData";

interface DayData {
  weekDay: Day | null;
  day: number | null;
  month: number | null;
  year: number | null;
  date: Date | null;
  timeStamp: number | null;
}

export const getMonthDetails = (month: number, year: number) => {
  const totalBlocks: number = 42;
  const calendarDays: DayData[] = [];

  const firstDay = getFirstdayOfMonth(month, year);

  for (let index = 0; index < totalBlocks; index++) {
    const currentDay = getDayData({
      index,
      month,
      year,
      firstDay: firstDay - 1, // added one to firstday because index starts at zero
    });

    calendarDays.push(currentDay);
  }

  return calendarDays;
};
