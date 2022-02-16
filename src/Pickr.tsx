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
  /**  Disables or Enables the datepicker button */
  disabled?: boolean;
  /**  Boolean to show or hide the datepicker's calendar. Useful for progamatically updating calendar visibility without having to click on datepicker button */
  visible?: boolean;
  /** If set to true, the datepicker will be open by default at initial render */
  openByDefault?: boolean;
  /** If set to true, datepicker will be closed when focus leaves the datepicker component */
  closeOnBlur?: boolean;
  /** Sets the date format for datepicker */
  format?: "ddmmyy" | "mmddyy" | "yymmdd";
  /** Sets the date separator for datepicker */
  separator?: "/" | "-" | ".";
  /** Callback function to be triggered when a new date is selected. Pickr automatically provides the date in specified format and the datestring this function. */
  onDateChange: (dateString: Date, date: DDMMYY) => void;
}

/** Custom Datepicker component for react.  */
export const Pickr: React.VFC<PickrProps> = ({
  format,
  separator,
  openByDefault = false,
  disabled = false,
  closeOnBlur = false,
  onDateChange,
  visible,
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
    const formatted = formatDate(
      dayOfMonth!!,
      month!!,
      year!!,
      format,
      separator
    );

    return activePreset === "Custom" ? formatted : activePreset;
  };

  const getTitle = (day: DayData) => {
    return `${months[day.month as number]} ${day.dayOfMonth}, ${day.year}`;
  };

  // set default state to open if open by default is true
  useLayoutEffect(() => {
    openByDefault && setShowCalendar(true);
  }, []);

  // set showcalendar based on custom toggle prop
  useEffect(() => {
    // check if customtoggle was provided
    if (visible === undefined) return;

    // update calendar visibility based on toggle
    setShowCalendar(visible);
  }, [visible]);

  // close dropdown on blur
  useEffect(() => {
    // exit if close on blur is false
    if (!closeOnBlur || !showCalendar) return;

    const handleClick = (e: MouseEvent) => {
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
    const formatted = formatDate(
      dayOfMonth!!,
      month!!,
      year!!,
      format,
      separator
    );

    // return datestring and date
    onDateChange(selectedDay?.dateString!!, formatted);

    // update the active preset
    updateActivePreset(selectedDay);
  }, [selectedDay]);

  return (
    <PickrContainer {...props} ref={pickrRef}>
      <Button
        text={getButtonText()}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label="Date Picker"
        icon={PlusIcon}
        iconRotation={showCalendar ? 45 : 0}
        onClick={() => setShowCalendar(!showCalendar)}
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
          <PickrCalendar role="grid">
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
            <CalendarBody role="row">
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
                  role="gridcell"
                  aria-selected={day.timeStamp === selectedDay?.timeStamp}
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
