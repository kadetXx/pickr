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
import { getMonthDetails } from './utils'
import PlusIcon from "./svg/icon-plus.svg";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  toggle: boolean;
  openByDefault: boolean;
  closeOnBlur: boolean;
}

export const Pickr: React.VFC<Props> = ({
  disabled,
  openByDefault,
  closeOnBlur,
  ...props
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<PresetItemProps["presetTitle"]>("Today");
  const [calendarState, setCalendarState] = useState({
    day: new Date().getDay(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

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
    const test = getMonthDetails(calendarState.month, calendarState.year);
    console.log(test);
    console.log(calendarState);
    
  }, [calendarState])
  

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
            <CalendarHead month="November" year={2021} />
            <CalendarBody>
              {weekDays.map((item, index) => (
                <CalendarDay key={index} status="dormant" date={item.slice(0, 1)} />
              ))}
            </CalendarBody>
          </PickrCalendar>
        </PickrSections>
      </Overlay>
    </PickrContainer>
  );
};
