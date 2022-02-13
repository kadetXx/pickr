import type { Day } from "../constants";
import { weekDays } from "../constants";
import { getNumberOfDays } from "./getNumberOfDays";
import { getMonthAndYearOfSpillOvers } from "./getMonthAndYearOfSpillOver";

interface DayData {
  weekDay: Day | null;
  day: number | null;
  month: number | null;
  year: number | null;
  date: Date | null;
  timeStamp: number | null;
}

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
  const prevMonthNoOfDays = getNumberOfDays(
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

  month === 1 && console.log(prevMonthNoOfDays);
  

  // if the current iteration belongs to previous month
  day = belongsToPrevMonth
    ? // day will be equal to no of days in current iterations's month minus number of spills plus one
      (prevMonthNoOfDays - noOfPrevMonthSpills) + 1
    : // else if current iteration belongs to next month,
    belongsToNextMonth
    ? // day will be the total number of days of active month subtracted from current index plus one
      (index + 1) - activeMonthNoOfDays
    : // otherwise, the  day will be one plus firstDayOfMonth minus current index
      index - firstDay + 1;

  // set day, date and timestamnp
  dayData["day"] = day;
  dayData["date"] = new Date(
    `${day + 1}/${monthOfCurrentIndex + 1}/${yearOfCurrentIndex}`
  );

  return dayData;
};
