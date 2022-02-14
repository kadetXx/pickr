import React, { useState, useEffect } from "react";

import { getMonthData, DayData } from "../utils";
import { PresetItemProps } from "../components";

interface CalendarState {
  month: number;
  year: number;
}

interface Preset {
  title: PresetItemProps["title"];
  day: DayData;
}

export const useCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<DayData>();
  const [calendarDays, setCalendarDays] = useState<DayData[]>();
  const [calendarState, setCalendarState] = useState<CalendarState>();
  const [presets, setPresets] = useState();

  const monthSwitcher = (direction: "prev" | "next"): void => {
    if (!calendarState) {
      return;
    }

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
    const presentDay = new Date().getDate();
    const presentMonth = new Date().getMonth();
    const presentYear = new Date().getFullYear();

    const { calendar } = getMonthData(presentMonth, presentYear);

    const today = calendar.find((item) => {
      return (
        item.dayOfMonth === presentDay &&
        item.month === presentMonth &&
        item.year === presentYear
      );
    });

    setCalendarDays(calendar);
    setSelectedDay(today);
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

  return {
    selectedDay,
    setSelectedDay,
    calendarDays,
    monthSwitcher,
  };
};
