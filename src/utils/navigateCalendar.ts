import { getMonthAndYear } from "./getMonthAndYear";
import { getMonthData } from "./getMonthData";

const findDay = (
  index: number,
  currentCalendar: DayData[],
  currentDay: DayData
) => {
  let calendarOfIndex;

  if (index < 0) {
    const [month, year] = getMonthAndYear({
      month: currentDay.month!!,
      year: currentDay.year!!,
      type: "prev",
    });
    const { calendar, numberOfDays } = getMonthData(month, year);
    const day = calendar[index + numberOfDays];
    return day;
  } else if (index > currentCalendar.length - 1) {
    const [month, year] = getMonthAndYear({
      month: currentDay.month!!,
      year: currentDay.year!!,
      type: "next",
    });

    const { calendar, numberOfDays } = getMonthData(month, year);
    const day = calendar[index - numberOfDays];
    return day;
  } else {
    calendarOfIndex = currentCalendar;
    const day = calendarOfIndex[index];
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

  // get index of currently selected day
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

  // get next, prev, top and bottom
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
