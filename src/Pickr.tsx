import React, {
  useState,
  useEffect,
  useLayoutEffect,
  HTMLAttributes,
} from "react";

import {
  PickrContainer,
  PickrSections,
  PickrPresets,
  PickrCalendar,
  CalendarBody,
} from "./Pickr.styles";

import {
  Button,
  Overlay,
  PresetItem,
  PresetItemProps,
  CalendarHead,
  CalendarDay,
} from "./components";

import { presetDays, weekDays, months } from "./constants";
import { getMonthData, DayData } from "./utils";
import PlusIcon from "./svg/icon-plus.svg";

export interface PickrProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  toggle: boolean;
  openByDefault: boolean;
  closeOnBlur: boolean;
}

interface CalendarState {
  month: number;
  year: number;
}

export const Pickr: React.VFC<PickrProps> = ({
  disabled,
  openByDefault,
  closeOnBlur,
  ...props
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<DayData>();
  const [calendarDays, setCalendarDays] = useState<DayData[]>();
  const [calendarState, setCalendarState] = useState<CalendarState>();

  const [activePreset, setActivePreset] =
    useState<PresetItemProps["presetTitle"]>("Today");

  const handleClick = (): void => {
    setShowCalendar(!showCalendar);
  };

  const handleBlur = (): void => {
    closeOnBlur && setShowCalendar(false);
  };

  const handleHeadSwitch = (direction: "prev" | "next"): void => {
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

  useLayoutEffect(() => {
    // check if openbydefault is true and set default state to open
    openByDefault && setShowCalendar(true);
  }, []);

  useEffect(() => {
    // check if toggle prop was provided and setshow according to toggle
    "toggle" in props && setShowCalendar(props.toggle);
  }, [props.toggle]);

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

  return (
    <PickrContainer onBlur={handleBlur}>
      <Button
        selectedDate="Today"
        disabled={disabled}
        icon={PlusIcon}
        iconRotation={showCalendar ? 45 : 0}
        onClick={handleClick}
      />
      <Overlay visible={showCalendar}>
        <PickrSections>
          <PickrPresets>
            {presetDays.map((option, index) => (
              <PresetItem
                key={index}
                action={setActivePreset}
                active={activePreset === option.presetTitle}
                {...option}
              />
            ))}
          </PickrPresets>
          <PickrCalendar>
            <CalendarHead
              month={months[selectedDay?.month || 0]}
              year={selectedDay?.year as number}
              action={handleHeadSwitch}
            />
            <CalendarBody>
              {weekDays.map((item, index) => (
                <CalendarDay
                  key={index}
                  status="dormant"
                  date={item.slice(0, 1)}
                />
              ))}

              {calendarDays?.map((day, index) => (
                <CalendarDay
                  key={index}
                  status={
                    day.timeStamp === selectedDay?.timeStamp
                      ? "active"
                      : day.month === selectedDay?.month
                      ? "selectable"
                      : "dormant"
                  }
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
