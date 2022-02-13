import type { Month, Day } from "../constants";
import { weekDays } from "../constants";

interface DayData {
  weekDay: Day | null;
  day: number | null;
  month: number | null;
  year: number | null;
  date: Date | null;
  timeStamp: number | null;
}

// get first day
export const getFirstdayOfMonth = (month: number, year: number): number => {
  return new Date(year, month).getDay();
};

// get number of days in the month
export const getNumberOfDays = (month: number, year: number): number => {
  const range = 35;
  const nextMonthSpilledDays = new Date(year, month, range).getDay();
  const currentMonthNumberOfDays = range - nextMonthSpilledDays;

  return currentMonthNumberOfDays;
};

const getMonthAndYearOfSpillOvers = ({
  type,
  month,
  year,
}: {
  month: number;
  year: number;
  type: "prev" | "next" | "current";
}) => {
  const prevMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;

  const prevYear = month === 0 ? year - 1 : year;
  const nextYear = month === 11 ? year + 1 : year;

  switch (type) {
    case "current":
      return {
        monthOfCurrentIndex: month,
        yearOfCurrentIndex: year,
      };

    case "prev":
      return {
        monthOfCurrentIndex: prevMonth,
        yearOfCurrentIndex: prevYear,
      };

    case "next":
      return {
        monthOfCurrentIndex: nextMonth,
        yearOfCurrentIndex: nextYear,
      };
  }
};

export const getDayData = ({
  index,
  month,
  year,
  firstDay,
}: {
  index: number;
  month: number;
  year: number;
  firstDay: number;
}) => {
  let dayData: DayData = {
    weekDay: null,
    day: null,
    month: null,
    year: null,
    date: null,
    timeStamp: null,
  };

  const activeMonthNoOfDays = getNumberOfDays(month, year);

  // check if current iteration is a spillover
  const belongsToPrevMonth = index < firstDay;
  const belongsToNextMonth = index + 1 > activeMonthNoOfDays;

  // get the correct day of the month and correct year of the current iteration
  const { monthOfCurrentIndex, yearOfCurrentIndex } =
    getMonthAndYearOfSpillOvers({
      month,
      year,
      type: belongsToPrevMonth
        ? "prev"
        : belongsToNextMonth
        ? "next"
        : "current",
    });

  // get the number of days in the current iterations's month
  const currentIndexMonthNoOfDays = getNumberOfDays(
    monthOfCurrentIndex,
    yearOfCurrentIndex
  );

  // set month and year;
  dayData["month"] = monthOfCurrentIndex;
  dayData["year"] = yearOfCurrentIndex;

  // get the weekday of the current iteration
  const weekDayIndex = index % firstDay;
  dayData["weekDay"] = weekDays[weekDayIndex];

  // initialize day variabe that'll be updated depending on if current iteration belongs
  // to the active month, the previous month or the next month;
  let day: number;

  // get number of spills of previous month
  const noOfPrevMonthSpills = firstDay - index;

  // if the current iteration belongs to previous month
  day = belongsToPrevMonth
    ? // day will be equal to no of days in current iterations's month minus number of spills plus one
      currentIndexMonthNoOfDays - noOfPrevMonthSpills + 1
    : // else if current iteration belongs to next month,
    belongsToNextMonth
    ? // day will be the total number of days of active month subtracted from current index plus one
      index + 1 - activeMonthNoOfDays
    : // otherwise, the  day will be one plus firstDayOfMonth minus current index
      index - firstDay + 1;

  // set day, date and timestamnp
  dayData["day"] = day;
  dayData["date"] = new Date(
    `${day}/${monthOfCurrentIndex}/${yearOfCurrentIndex}`
  );

  return dayData;
};

export const getMonthDetails = (month: number, year: number) => {
  const totalBlocks: number = 42;
  const calendarDays: DayData[] = [];

  const firstDay = getFirstdayOfMonth(month, year);

  for (let index = 0; index < totalBlocks; index++) {
    const currentDay = getDayData({
      index,
      month,
      year,
      firstDay,
    });

    calendarDays.push(currentDay);
  }

  return calendarDays;
};
