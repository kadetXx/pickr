import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  HTMLAttributes,
} from "react";

import {
  PickrContainer,
  PickrSections,
  PickrPresetList,
  PickrPresetListItem,
  PickrCalendar,
  CalendarBody,
} from "./Pickr.styles";

import {
  Button,
  Overlay,
  PresetItem,
  CalendarHead,
  CalendarItem,
} from "./components";

import { weekDays, months } from "./constants";
import { useCalendar, usePresets } from "./hooks";
import { formatDate } from "./utils";

import PlusIcon from "./svg/icon-plus.svg";

export interface PickrProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  toggleCalendar?: boolean;
  openByDefault?: boolean;
  closeOnBlur?: boolean;
  format?: DateFormat;
  separator?: Separators;
  onDateChange: (dateString: Date, date: DDMMYY) => void;
}

export const Pickr: React.VFC<PickrProps> = ({
  disabled,
  openByDefault,
  closeOnBlur,
  onSelect,
  onDateChange,
  format = "ddmmyy",
  separator = "/",
  ...props
}) => {
  const pickrRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const { selectedDay, setSelectedDay, calendarDays, monthSwitcher } =
    useCalendar(showCalendar);
  const { presets, activePreset, setActivePreset, updateActivePreset } =
    usePresets(selectedDay);

  const getButtonText = () => {
    if (!selectedDay) {
      return "Today";
    }

    const { dayOfMonth, month, year } = selectedDay;
    const formatted = formatDate(dayOfMonth!!, month!!, year!!, format, separator);

    return activePreset === "Custom" ? formatted : activePreset;
  };

  const getTitle = (day: DayData) => {
    return `${months[day.month as number]} ${day.dayOfMonth}, ${day.year}`;
  };

  const handleMonthSwitch = () => {};

  // set default state to open if open by default is true
  useLayoutEffect(() => {
    openByDefault && setShowCalendar(true);
  }, []);

  // set showcalendar based on custom toggle prop
  useEffect(() => {
    "toggle" in props && setShowCalendar(!!props.toggleCalendar);
  }, [props.toggleCalendar]);

  // close dropdown on blur
  useEffect(() => {
    // exit if close on blur is false
    if (!!closeOnBlur === false) return;

    const handleClick = (e: MouseEvent) => {
      // exit if calendar is currently not shown
      if (showCalendar === false) return;

      // get classname of main pickr parent container
      const parentClassname = pickrRef.current?.className;
      // get clicked element
      const target = e.target as HTMLElement;

      // check if clicked item is a decendant of main pickr parent container
      const isDescendant = target?.closest(`.${parentClassname}`);

      // close picker if clicked element isn't a decendant of main pickr parent
      !isDescendant && setShowCalendar(false);
    };

    // rlisten for click events in window
    window.addEventListener("click", handleClick);

    // remove click listener on cleanup
    return () => window.removeEventListener("click", handleClick);
  }, [showCalendar, closeOnBlur]);

  // return value of date
  useEffect(() => {
    if (!selectedDay) return;

    const { dayOfMonth, month, year } = selectedDay;
    const formatted = formatDate(dayOfMonth!!, month!!, year!!, format, separator);

    // return datestring and date
    onDateChange(selectedDay?.dateString!!, formatted);

    // update the active preset
    updateActivePreset(selectedDay);
  }, [selectedDay]);

  return (
    <PickrContainer ref={pickrRef}>
      <Button
        text={getButtonText()}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label="Datepicker"
        icon={PlusIcon}
        iconRotation={showCalendar ? 45 : 0}
        title="Datepicker"
        onClick={() => setShowCalendar(!showCalendar)}
        onFocus={() => setShowCalendar(true)}
      />
      <Overlay visible={showCalendar}>
        <PickrSections>
          <PickrPresetList>
            {presets?.map((option, index) => (
              <PickrPresetListItem key={index}>
                <PresetItem
                  {...option}
                  title={getTitle(option.day)}
                  aria-label={option.presetTitle}
                  active={activePreset === option.presetTitle}
                  onClick={() => [
                    setSelectedDay(option.day),
                    setActivePreset(option.presetTitle),
                  ]}
                  onFocus={() => [
                    setSelectedDay(option.day),
                    setActivePreset(option.presetTitle),
                  ]}
                />
              </PickrPresetListItem>
            ))}
          </PickrPresetList>
          <PickrCalendar>
            <CalendarHead
              month={months[selectedDay?.month || 0]}
              year={selectedDay?.year as number}
              action={(direction) => {
                if (!selectedDay) return;
                monthSwitcher(
                  selectedDay.month!!,
                  selectedDay.year!!,
                  direction
                );
              }}
            />
            <CalendarBody>
              {weekDays.map((item, index) => (
                <CalendarItem
                  key={index}
                  status="dormant"
                  date={item.slice(0, 1)}
                />
              ))}

              {calendarDays?.map((day, index) => (
                <CalendarItem
                  key={index}
                  status={
                    day.timeStamp === selectedDay?.timeStamp
                      ? "active"
                      : day.month === selectedDay?.month
                      ? "selectable"
                      : "dormant"
                  }
                  role="button"
                  title={getTitle(day)}
                  aria-label={getTitle(day)}
                  date={day.dayOfMonth as number}
                  onClick={() => setSelectedDay(day)}
                />
              ))}
            </CalendarBody>
          </PickrCalendar>
        </PickrSections>
      </Overlay>
    </PickrContainer>
  );
};
