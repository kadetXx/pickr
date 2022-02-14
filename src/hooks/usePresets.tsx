import React, { useState, useEffect } from "react";

import { DayData } from "../utils";
import { PresetItemProps } from "../components";

import CalendarStarIcon from "../svg/icon-calendar-star.svg";
import CalendarStarIconTeal from "../svg/icon-calendar-star-teal.svg";

import CalendarDayoneIcon from "../svg/icon-calendar-dayone.svg";
import CalendarDayoneIconTeal from "../svg/icon-calendar-dayone-teal.svg";

import CalendarMinusIcon from "../svg/icon-calendar-minus.svg";
import CalendarMinusIconTeal from "../svg/icon-calendar-minus-teal.svg";

import CalendarEditIcon from "../svg/icon-calendar-edit.svg";
import CalendarEditIconTeal from "../svg/icon-calendar-edit-teal.svg";

interface Preset {
  icon: string;
  iconAlt: string;
  day: DayData;
  presetTitle: PresetItemProps["presetTitle"];
}

type ActivePreset = PresetItemProps["presetTitle"];

export const usePresets = (
  calendar: DayData[] | undefined,
  selectedDay: DayData | undefined
) => {
  const [presets, setPresets] = useState<Preset[]>();
  const [activePreset, setActivePreset] = useState<ActivePreset>("Today");

  useEffect(() => {
    let today;
    let yesterday;
    let thisMonday;
    let lastMonday;
    let custom;

    if (!calendar || !selectedDay) {
      return;
    }

    // get today
    const date = new Date();
    const presentDay = date.getDate();
    const presentMonth = date.getMonth();
    const presentYear = date.getFullYear();

    // find today in calendar days array
    const indexOfToday = calendar.findIndex((item) => {
      return (
        item.dayOfMonth === presentDay &&
        item.month === presentMonth &&
        item.year === presentYear
      );
    });

    // save today preset
    today = calendar[indexOfToday];

    // get yesterday
    yesterday = calendar[indexOfToday - 1];

    // this monday

    // last monday

    // set custom to currently selected date
    custom = selectedDay;

    // update presets
    setPresets([
      {
        icon: CalendarStarIcon,
        iconAlt: CalendarStarIconTeal,
        presetTitle: "Today",
        day: today,
      },
      {
        icon: CalendarDayoneIcon,
        iconAlt: CalendarDayoneIconTeal,
        presetTitle: "Yesterday",
        day: yesterday,
      },
      {
        icon: CalendarMinusIcon,
        iconAlt: CalendarMinusIconTeal,
        presetTitle: "This Monday",
        day: today,
      },
      {
        icon: CalendarMinusIcon,
        iconAlt: CalendarMinusIconTeal,
        presetTitle: "Last Monday",
        day: today,
      },
      {
        icon: CalendarEditIcon,
        iconAlt: CalendarEditIconTeal,
        presetTitle: "Custom",
        day: custom,
      },
    ]);
  }, [calendar, selectedDay]);

  return { presets, activePreset, setActivePreset };
};