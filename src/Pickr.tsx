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

import { weekDays, months } from "./constants";
import { useCalendar, usePresets } from "./hooks";

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

  const { selectedDay, setSelectedDay, calendarDays, monthSwitcher } =
    useCalendar();

  const { presets, activePreset, setActivePreset } = usePresets(
    calendarDays,
    selectedDay
  );

  // handle outside clicks
  const handleBlur = (): void => {
    closeOnBlur && setShowCalendar(false);
  };

  // set default state to open if open by default is true
  useLayoutEffect(() => {
    openByDefault && setShowCalendar(true);
  }, [props.toggle]);

  // set showcalendar based on custom toggle prop
  useEffect(() => {
    "toggle" in props && setShowCalendar(props.toggle);
  }, []);

  return (
    <PickrContainer onBlur={handleBlur}>
      <Button
        selectedDate="Today"
        disabled={disabled}
        icon={PlusIcon}
        iconRotation={showCalendar ? 45 : 0}
        onClick={() => setShowCalendar(!showCalendar)}
      />
      <Overlay visible={showCalendar}>
        <PickrSections>
          <PickrPresets>
            {presets?.map((option, index) => (
              <PresetItem
                {...option}
                key={index}
                active={activePreset === option.presetTitle}
                onClick={() => [
                  setSelectedDay(option.day),
                  setActivePreset(option.presetTitle),
                ]}
              />
            ))}
          </PickrPresets>
          <PickrCalendar>
            <CalendarHead
              month={months[selectedDay?.month || 0]}
              year={selectedDay?.year as number}
              action={monthSwitcher}
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
