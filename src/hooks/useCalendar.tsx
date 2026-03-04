import React, { useState, useEffect, useRef } from "react";
import { getMonthData, navigateCalendar } from "@/utils";

interface CalendarState {
  month: number;
  year: number;
}

export const useCalendar = (visible: boolean, initialDate?: Date) => {
  const [selectedDay, setSelectedDay] = useState<DayData>();
  const [calendarDays, setCalendarDays] = useState<DayData[]>();
  const [calendarState, setCalendarState] = useState<CalendarState>();
  const isNavigating = useRef(false);

  // switch the current month back and forth
  const monthSwitcher = (
    month: number,
    year: number,
    direction: "prev" | "next"
  ): void => {
    let newmonth;
    let newyear;

    if (direction === "next") {
      newmonth = month === 11 ? 0 : month! + 1;
      newyear = month === 11 ? year! + 1 : year;
    } else {
      newmonth = month === 0 ? 11 : month! - 1;
      newyear = month === 0 ? year! - 1 : year;
    }

    isNavigating.current = true;
    setCalendarState({
      month: newmonth,
      year: newyear!,
    });
  };

  // populate calendar and set default selected date to today on mount
  useEffect(() => {
    // create new date
    const date = initialDate || new Date();
    // get preset day
    const presentDay = date.getDate();
    const presentMonth = date.getMonth();
    const presentYear = date.getFullYear();

    // generate calenday days
    const { calendar } = getMonthData(presentMonth, presentYear);

    // grab today's day from generated calendar
    const today = calendar.find(item => {
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

  // update calendar each time month or year is switched
  useEffect(() => {
    if (calendarState) {
      const { month, year } = calendarState;
      const { calendar } = getMonthData(month, year);
      setCalendarDays(calendar);

      // only move selection when navigating via day click, not arrow buttons
      if (!isNavigating.current && selectedDay?.dayOfMonth) {
        const { dayOfMonth } = selectedDay;
        const { numberOfDays } = getMonthData(month, year);

        const dayToBeSelected =
          dayOfMonth > numberOfDays ? numberOfDays : dayOfMonth;

        const selected = calendar.find(item => {
          return (
            item.dayOfMonth === dayToBeSelected &&
            item.month === month &&
            item.year === year
          );
        });

        setSelectedDay(selected);
      }

      isNavigating.current = false;
    }
  }, [calendarState]);

  // update calendar if selected date changes
  useEffect(() => {
    if (selectedDay) {
      const { calendar } = getMonthData(
        selectedDay?.month!,
        selectedDay?.year!
      );

      setCalendarDays(calendar);
    }
  }, [selectedDay]);

  // allow keyboard arrow keys to switch dates
  useEffect(() => {
    // exit of calendar is not currently visible
    if (!visible || !selectedDay || !calendarDays) return;

    // trigger change
    const switchDay = (e: KeyboardEvent) => {
      navigateCalendar(e, calendarDays, selectedDay, setSelectedDay);
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
    calendarState,
    monthSwitcher,
  };
};
