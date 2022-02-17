import { getMonthData } from "@/utils";
import { getMonthAndYear } from "./getMonthAndYear";

export const getThisMonday = (
  calendar: DayData[],
  indexOfToday: number,
  today: DayData
) => {
  if (!today.month || !today.year) return;

  // get the calendar days from present day till end of month
  const calendarFromToday = calendar.slice(indexOfToday);

  // find the first monday within this range
  const monday = calendarFromToday.find((item) => item.weekDay === "Monday");

  // if a monday is present
  if (monday) {
    // we return it
    return monday;

    // if a monday isn't present, it means next monday belongs to the next month
  } else {
    // so we get index of next month and year
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

  // get the calendar days from first day till present day
  const calendarBeforeToday = calendar.slice(0, indexOfToday);

  // reverse it because we need the first monday backwards
  const reversed = calendarBeforeToday.reverse();

  // fild the firs monday within this range
  const monday = reversed.find((item) => item.weekDay === "Monday");

  // if there is a monday present
  if (monday) {
    // we return it
    return monday;

    // if a monday isn't present, it means next monday belongs to the previous month
  } else {
    // get index of previous month and year
    const [month, year] = getMonthAndYear({
      month: today.month,
      year: today.year,
      type: "prev",
    });

    // get new calendar for previous month
    const { calendar: prevMonthCalendar } = getMonthData(month, year);

    // reverse it becuase we need to get the first monday backwards
    const reversed = prevMonthCalendar.reverse();

    // find the first monday and then return it
    return reversed.find((item) => item.weekDay === "Monday");
  }
};
