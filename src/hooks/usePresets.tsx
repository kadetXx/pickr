import React, { useState, useEffect } from "react";

import { getMonthData, getThisMonday, getLastMonday } from "../utils";
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

export const usePresets = (selectedDay: DayData | undefined) => {
  const [presets, setPresets] = useState<Preset[]>();
  const [activePreset, setActivePreset] = useState<PresetTitle>("Today");

  const updateActivePreset = (day: DayData) => {
    if (!presets) return;

    // grab timestamps of all presets
    const timestamps = presets?.map((item) => item.day.timeStamp);
    // check if timestamp of current day is in preset list
    const isPreset = timestamps?.includes(day?.timeStamp);

    // if there's a match
    if (isPreset) {
      // grab the items that matched from preset lists
      const matches = presets?.filter(
        (item) => item.day.timeStamp === day.timeStamp
      );

      // get titles of matches
      const titles = matches?.map((item) => item.presetTitle);

      // check if any of the current matches have previously been selected
      const isAlreadySelected = titles?.includes(activePreset);

      // set active preset to the matched item if it hasn't been selected
      !!matches &&
        !isAlreadySelected &&
        setActivePreset(matches[0].presetTitle);
    } else if (typeof isPreset !== undefined) {
      // othewise, if selected day isn't a preset, set active preset to custom
      setActivePreset("Custom");
    }
  };

  useEffect(() => {
    let today;
    let yesterday;
    let thisMonday;
    let lastMonday;
    let custom;

    if (!selectedDay) return;

    // get today
    const date = new Date();
    const presentDay = date.getDate();
    const presentMonth = date.getMonth();
    const presentYear = date.getFullYear();

    // generate calenday days
    const { calendar } = getMonthData(presentMonth, presentYear);

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

    // grab the nearest monday in front
    thisMonday = getThisMonday(calendar, indexOfToday, today);

    // last monday
    lastMonday = getLastMonday(calendar, indexOfToday, today);

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
        day: thisMonday!!,
      },
      {
        icon: CalendarMinusIcon,
        iconAlt: CalendarMinusIconTeal,
        presetTitle: "Last Monday",
        day: lastMonday!!,
      },
      {
        icon: CalendarEditIcon,
        iconAlt: CalendarEditIconTeal,
        presetTitle: "Custom",
        day: custom,
      },
    ]);
  }, [selectedDay]);

  return { presets, activePreset, setActivePreset, updateActivePreset };
};
