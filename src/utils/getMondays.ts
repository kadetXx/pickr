import { getMonthData } from "@/utils";
import { getMonthAndYear } from "./getMonthAndYear";

export const getThisMonday = (
  calendar: DayData[],
  indexOfToday: number,
  today: DayData
) => {
  if (!today.month || !today.year) return;

  const calendarFromToday = calendar.slice(indexOfToday);
  const monday = calendarFromToday.find((item) => item.weekDay === "Monday");

  if (monday) {
    return monday;
  } else {
    // get index of next month and year
    const [month, year] = getMonthAndYear({
      month: today.month,
      year: today.year,
      type: "next",
    });

    // get new calendar for next month
    const { calendar: nextMonthCalendar } = getMonthData(month, year);

    // find the first monday in the next calendar
    return nextMonthCalendar.find((item) => item.weekDay === "Monday");
  }
};

export const getLastMonday = (
  calendar: DayData[],
  indexOfToday: number,
  today: DayData
) => {
  if (!today.month || !today.year) return;

  const calendarBeforeToday = calendar.slice(0, indexOfToday);
  const reversed = calendarBeforeToday.reverse();

  const monday = reversed.find((item) => item.weekDay === "Monday");

  if (monday) {
    return monday;
  } else {
    // get index of previous month and year
    const [month, year] = getMonthAndYear({
      month: today.month,
      year: today.year,
      type: "prev",
    });

    // get new calendar for next month
    const { calendar: prevMonthCalendar } = getMonthData(month, year);
    const reversed = prevMonthCalendar.reverse();

    return reversed.find((item) => item.weekDay === "Monday");
  }
};
