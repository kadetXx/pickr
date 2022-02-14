import type { Day } from "../constants";
import { weekDays } from "../constants";
import { getNumberOfDays } from "./getNumberOfDays";
import { getMonthAndYearOfSpillOvers } from "./getMonthAndYearOfSpillOver";

export interface DayData {
  weekDay: Day | null;
  dayOfMonth: number | null;
  month: number | null;
  year: number | null;
  dateString: Date | null;
  timeStamp: number | null;
}

export const getDayData = ({
  index,
  month,
  year,
  firstDay,
  numberOfDays
}: {
  index: number;
  month: number;
  year: number;
  firstDay: number;
  numberOfDays: number;
}) => {
  let dayData: DayData = {
    weekDay: null,
    dayOfMonth: null,
    month: null,
    year: null,
    dateString: null,
    timeStamp: null,
  };

  // get number of spills of previous month
  const prevMonthSpills = firstDay;

  // get number of days of active
  const activeMonthNoOfDays = numberOfDays;

  // check if current iteration is a spillover
  const belongsToPrevMonth = index < firstDay;
  const belongsToNextMonth = index - prevMonthSpills >= activeMonthNoOfDays;

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
  const prevMonthNoOfDays = getNumberOfDays(
    monthOfCurrentIndex,
    yearOfCurrentIndex
  );

  // set month and year;
  dayData["month"] = monthOfCurrentIndex;
  dayData["year"] = yearOfCurrentIndex;

  // get the weekday of the current iteration
  const weekDayIndex = index % 7;
  dayData["weekDay"] = weekDays[weekDayIndex];

  // initialize day variabe that'll be updated depending on if current iteration belongs
  // to the active month, the previous month or the next month;
  let day: number;

  // calculate day of the monthif day belongs to previous month
  const prevMonthDay = prevMonthNoOfDays - prevMonthSpills + index + 1;
  // calculate day of the monthif day belongs to previous month
  const nextMonthDay = ((index - prevMonthSpills) % activeMonthNoOfDays) + 1;

  // if the current iteration belongs to previous month
  day = belongsToPrevMonth
    ? prevMonthDay // previous month day will be used
    : belongsToNextMonth // else if current iteration belongs to next month,
    ? nextMonthDay // next month day will be used
    : index - firstDay + 1; // otherwise, the  day will be current index minus firstDayOfMonth plus one

  // set day, date and timestamnp
  dayData["dayOfMonth"] = day;

  const dateString = new Date(
    `${monthOfCurrentIndex + 1}/${day}/${yearOfCurrentIndex}`
  );

  dayData["dateString"] = dateString;
  dayData["timeStamp"] = dateString.getTime();

  return dayData;
};
