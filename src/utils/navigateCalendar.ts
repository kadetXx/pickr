import { getMonthAndYear } from "./getMonthAndYear";
import { getMonthData } from "./getMonthData";

const findDay = (
  index: number,
  currentCalendar: DayData[],
  currentDay: DayData
) => {
  // if seeked index belongs to previous calendar group
  if (index < 0) {
    // get the month and year of previous calendar group
    const [month, year] = getMonthAndYear({
      month: currentDay.month!!,
      year: currentDay.year!!,
      type: "prev",
    });

    // get the calendarDays of previous group
    const { calendar, numberOfDays } = getMonthData(month, year);

    // grab the day of seeked index
    const day = calendar[index + numberOfDays];

    // return the day
    return day;

    // if seeked index belongs to next calendar group
  } else if (index > currentCalendar.length - 1) {
    // get the month and year of next calendar group
    const [month, year] = getMonthAndYear({
      month: currentDay.month!!,
      year: currentDay.year!!,
      type: "next",
    });

    // get the calendarDays of next group
    const { calendar, numberOfDays } = getMonthData(month, year);

    // grab the day of seeked index
    const day = calendar[index - numberOfDays];

    // grab the day of seeked index
    return day;

    // otherwise if seeked index belongs to visible calendar
  } else {
    // grab the day from visible calendar
    const day = currentCalendar[index];

    // return the day
    return day;
  }

  // return calendarOfIndex[index];
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
