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
  CalendarHead,
  CalendarItem,
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
  const { selectedDay, setSelectedDay, calendarDays, switcher } = useCalendar();
  const { presets, activePreset, setActivePreset } = usePresets(selectedDay);

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

  // update selected date when calendar item is clicked
  // and also change active preset to custom if selected date is not among presets
  const handleCalenderDayClick = (day: DayData) => {
    // return if presets is absent or the clicked day is already selected
    if (!presets || day.timeStamp === selectedDay?.timeStamp) return;

    // update state
    setSelectedDay(day);

    // grab timestamps of all presets
    const definitePresets = presets.map((item) => item.day.timeStamp);

    // check if timestamp of currently selected matches any of the presets
    const isADefinitePreset = definitePresets?.includes(day?.timeStamp);

    // if there's a match
    if (isADefinitePreset) {
      // grab the item that matched from preset lists
      const active = presets.find(
        (item) => item.day.timeStamp === day.timeStamp
      );

      // set active preset to the matched item
      !!active && setActivePreset(active.presetTitle);
    } else {
      // othewise, if there's no match, set active preset to custom
      setActivePreset("Custom");
    }
  };

  const getButtonText = () => {
    if (!selectedDay) {
      return "Today";
    }

    // extend number object to include padding function
    const pad = (value: number) => {
      const padded = ("0" + value).slice(-2);
      return padded;
    };

    const { dayOfMonth, month, year } = selectedDay;
    const ddmmyy: DDMMYY = `${pad(dayOfMonth!!)}/${pad(month!! + 1)}/${year!!}`;

    return activePreset === "Custom" ? ddmmyy : activePreset;
  };

  return (
    <PickrContainer onBlur={handleBlur}>
      <Button
        text={getButtonText()}
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
              action={switcher}
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
                  date={day.dayOfMonth as number}
                  onClick={() => handleCalenderDayClick(day)}
                />
              ))}
            </CalendarBody>
          </PickrCalendar>
        </PickrSections>
      </Overlay>
    </PickrContainer>
  );
};
