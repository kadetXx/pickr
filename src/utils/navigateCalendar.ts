import { getMonthAndYear } from "./getMonthAndYear";
import { getMonthData } from "./getMonthData";

const findDay = (
  index: number,
  currentCalendar: DayData[],
  currentDay: DayData
) => {
  const belongsToPrev = index < 0;
  const belongsToNext = index > currentCalendar.length - 1;

  // if seeked index belongs to previous or next calendar group
  if (belongsToPrev || belongsToNext) {
    // get the month and year of previous or next calendar group
    const [month, year] = getMonthAndYear({
      month: currentDay.month!!,
      year: currentDay.year!!,
      type: belongsToPrev ? "prev" : "next",
    });

    // get the calendarDays of previou or next group
    const { calendar, numberOfDays } = getMonthData(month, year);

    // day of the month on previous or next group to move to
    const dateToMoveTo = belongsToPrev
      ? index + numberOfDays
      : index - calendar.length + 7;

    // grab the day of seeked index
    const day = calendar.find(
      (item) => item.month === month && item.dayOfMonth === dateToMoveTo
    );

    // return the day
    return day;

    // otherwise if seeked index belongs to visible calendar
  } else {
    // grab the day from visible calendar
    const day = currentCalendar[index];

    // return the day
    return day;
  }
};

export const navigateCalendar = (
  e: KeyboardEvent,
  calendar: DayData[],
  selectedDay: DayData,
  setSelectedDay: React.Dispatch<React.SetStateAction<DayData | undefined>>
) => {
  // get key name
  const key = e.key.toLowerCase();

  // get index of currently selected day in visible calendar
  const indexOfCurrent = calendar.findIndex((item) => {
    return (
      item.dayOfMonth === selectedDay.dayOfMonth &&
      item.month === selectedDay.month &&
      item.year === selectedDay.year
    );
  });

  const next = indexOfCurrent + 1;
  const prev = indexOfCurrent - 1;
  const top = indexOfCurrent - 7;
  const bottom = indexOfCurrent + 7;

  // get next, prev, top and bottom days
  const nextDay = findDay(next, calendar, selectedDay);
  const prevDay = findDay(prev, calendar, selectedDay);
  const topDay = findDay(top, calendar, selectedDay);
  const bottomDay = findDay(bottom, calendar, selectedDay);

  switch (key) {
    case "arrowright":
      setSelectedDay(nextDay);
      break;
    case "arrowleft":
      setSelectedDay(prevDay);
      break;
    case "arrowup":
      setSelectedDay(topDay);
      break;
    case "arrowdown":
      setSelectedDay(bottomDay);
      break;
    default:
      break;
  }
};
