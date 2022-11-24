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
      month: currentDay.month!,
      year: currentDay.year!,
      type: belongsToPrev ? "prev" : "next",
    });

    // get the calendarDays of previou or next group
    const { calendar } = getMonthData(month, year);

    // grab the index of ghost current date we're switching from on prev or next calendar
    const ghostIndex = calendar.findIndex(item => item.dayOfMonth === currentDay.dayOfMonth && item.month === currentDay.month);

    // use the ghost index to select top or bottom item
    const day = calendar[belongsToPrev ? ghostIndex - 7 : ghostIndex + 7]

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
