import React, { useState, useEffect } from "react";

import { getMonthData, getIndexOfDay } from "../utils";

interface CalendarState {
  month: number;
  year: number;
}

export const useCalendar = (visible: boolean) => {
  const [selectedDay, setSelectedDay] = useState<DayData>();
  const [calendarDays, setCalendarDays] = useState<DayData[]>();
  const [calendarState, setCalendarState] = useState<CalendarState>();

  const switcher = (direction: "prev" | "next"): void => {
    if (!calendarState) return;

    const { month, year } = calendarState;

    let newmonth;
    let newyear;

    if (direction === "next") {
      newmonth = month === 11 ? 0 : month + 1;
      newyear = month === 11 ? year + 1 : year;
    } else {
      newmonth = month === 0 ? 11 : month - 1;
      newyear = month === 0 ? year - 1 : year;
    }

    setCalendarState({
      month: newmonth,
      year: newyear,
    });
  };

  // populate calendar and set default selected date to today on mount
  useEffect(() => {
    // create new date
    const date = new Date();
    // get preset day
    const presentDay = date.getDate();
    const presentMonth = date.getMonth();
    const presentYear = date.getFullYear();

    // generate calenday days
    const { calendar } = getMonthData(presentMonth, presentYear);

    // grab today's day from generated calendar
    const today = calendar.find((item) => {
      return (
        item.dayOfMonth === presentDay &&
        item.month === presentMonth &&
        item.year === presentYear
      );
    });

    // populate calendar days
    setCalendarDays(calendar);

    // set default selected day to today
    setSelectedDay(today);

    // save current calendar month and year
    setCalendarState({
      month: presentMonth,
      year: presentYear,
    });
  }, []);

  // update calendar and selected date each time month or year is manually switched
  useEffect(() => {
    if (calendarState && selectedDay?.dayOfMonth) {
      const { month, year } = calendarState;
      const { dayOfMonth } = selectedDay;
      const { calendar, numberOfDays } = getMonthData(month, year);

      const dayToBeSelected =
        dayOfMonth > numberOfDays ? numberOfDays : dayOfMonth;

      const selected = calendar.find((item) => {
        return (
          item.dayOfMonth === dayToBeSelected &&
          item.month === month &&
          item.year === year
        );
      });

      setCalendarDays(calendar);
      setSelectedDay(selected);
    }
  }, [calendarState]);

  // update calendar if selected date changes
  useEffect(() => {
    if (selectedDay) {
      const { calendar } = getMonthData(
        selectedDay?.month!!,
        selectedDay?.year!!
      );

      setCalendarDays(calendar);
    }
  }, [selectedDay]);

  useEffect(() => {
    // exit of calendar is not currently visible
    if (!visible || !selectedDay || !calendarDays) return;

    const switchDay = (e: KeyboardEvent) => {
      // get key name
      const key = e.key.toLowerCase();
      const indexOfCurrent = getIndexOfDay(selectedDay, calendarDays);

      // get next, prev, top and bottom
      const nextDay = calendarDays[indexOfCurrent + 1];
      const prevDay = calendarDays[indexOfCurrent - 1];
      const topDay = calendarDays[indexOfCurrent - 7];
      const bottomDay = calendarDays[indexOfCurrent + 7];

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

    // add a key listener
    document.addEventListener("keydown", switchDay);

    // remove listener on cleanup
    return () => {
      document.removeEventListener("keydown", switchDay);
    };
  }, [visible, selectedDay, calendarDays]);

  return {
    selectedDay,
    setSelectedDay,
    calendarDays,
    switcher,
  };
};
