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
import { getMonthDetails, DayData } from './utils'
import PlusIcon from "./svg/icon-plus.svg";

export interface PickrProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  toggle: boolean;
  openByDefault: boolean;
  closeOnBlur: boolean;
}

export const Pickr: React.VFC<PickrProps> = ({
  disabled,
  openByDefault,
  closeOnBlur,
  ...props
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<PresetItemProps["presetTitle"]>("Today");
  const [selectedDay, setSelectedDay] = useState<DayData>();
  const [calendarState, setCalendarState] = useState<DayData[]>()

  const handleClick = (): void => {
    setShowCalendar(!showCalendar);
  };

  const handleBlur = (): void => {
    closeOnBlur && setShowCalendar(false);
  };

  useEffect(() => {
    "toggle" in props && setShowCalendar(props.toggle);
  }, [props.toggle]);

  useLayoutEffect(() => {
    openByDefault && setShowCalendar(true);
  }, [openByDefault]);


  useEffect(() => {
    const presentDay = new Date().getDate();
    const presentMonth = new Date().getMonth();
    const presentYear = new Date().getFullYear();
    
    const calendar = getMonthDetails(presentMonth, presentYear);
    setCalendarState(calendar);

    const today = calendar.find((item) => {
      return (
        item.dayOfMonth === presentDay &&
        item.month === presentMonth &&
        item.year === presentYear
      );
    });
    
    setSelectedDay(today);
  }, []);
  
  return (
    <PickrContainer disabled={disabled} onBlur={handleBlur}>
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
            <CalendarHead month="November" year={selectedDay?.year as number} />
            <CalendarBody>
              {weekDays.map((item, index) => (
                <CalendarDay
                  key={index}
                  status="dormant"
                  date={item.slice(0, 1)}
                />
              ))}

              {calendarState?.map((day, index) => (
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
