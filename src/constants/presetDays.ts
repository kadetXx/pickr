import { PresetItemProps } from "../components";

import CalendarStarIcon from "../svg/icon-calendar-star.svg";
import CalendarStarIconTeal from "../svg/icon-calendar-star-teal.svg";

import CalendarDayoneIcon from "../svg/icon-calendar-dayone.svg";
import CalendarDayoneIconTeal from "../svg/icon-calendar-dayone-teal.svg";

import CalendarMinusIcon from "../svg/icon-calendar-minus.svg";
import CalendarMinusIconTeal from "../svg/icon-calendar-minus-teal.svg";

import CalendarEditIcon from "../svg/icon-calendar-edit.svg";
import CalendarEditIconTeal from "../svg/icon-calendar-edit-teal.svg";

type Presetday = Pick<PresetItemProps, "presetTitle" | "icon" | "iconAlt">;

export const presetDays: Presetday[] = [
  {
    presetTitle: "Today",
    icon: CalendarStarIcon,
    iconAlt: CalendarStarIconTeal,
  },
  {
    presetTitle: "Yesterday",
    icon: CalendarDayoneIcon,
    iconAlt: CalendarDayoneIconTeal,
  },
  {
    presetTitle: "This Monday",
    icon: CalendarMinusIcon,
    iconAlt: CalendarMinusIconTeal,
  },
  {
    presetTitle: "Last Monday",
    icon: CalendarMinusIcon,
    iconAlt: CalendarMinusIconTeal,
  },
  {
    presetTitle: "Custom",
    icon: CalendarEditIcon,
    iconAlt: CalendarEditIconTeal,
  },
];
