import React, {
  useState,
  useEffect,
  useLayoutEffect,
  HTMLAttributes,
} from "react";

import { PickrContainer, GridSections, OptionsContainer } from "./Pickr.styles";
import { Button, Overlay, PresetDay, PresetDayProps } from "./components";

import PlusIcon from "./svg/icon-plus.svg";
import CalendarStarIcon from "./svg/icon-calendar-star.svg";
import CalendarStarIconTeal from "./svg/icon-calendar-star-teal.svg";

interface Props extends HTMLAttributes<HTMLDivElement> {
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
  const [activePreset, setActivePreset] =
    useState<PresetDayProps["presetTitle"]>("Today");
  const presetDays: Pick<PresetDayProps, "presetTitle" | "icon" | "iconAlt">[] =
    [
      {
        presetTitle: "Today",
        icon: CalendarStarIcon,
        iconAlt: CalendarStarIconTeal,
      },
      {
        presetTitle: "Yesterday",
        icon: CalendarStarIcon,
        iconAlt: CalendarStarIconTeal,
      },
      {
        presetTitle: "This Monday",
        icon: CalendarStarIcon,
        iconAlt: CalendarStarIconTeal,
      },
      {
        presetTitle: "Last Monday",
        icon: CalendarStarIcon,
        iconAlt: CalendarStarIconTeal,
      },
      {
        presetTitle: "Custom",
        icon: CalendarStarIcon,
        iconAlt: CalendarStarIconTeal,
      },
    ];

  const handleClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleBlur = () => {
    closeOnBlur && setShowCalendar(false);
  };

  useEffect(() => {
    "toggle" in props && setShowCalendar(props.toggle);
  }, [props.toggle]);

  useLayoutEffect(() => {
    openByDefault && setShowCalendar(true);
  }, [openByDefault]);

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
        <GridSections>
          <OptionsContainer>
            {presetDays.map((option, index) => (
              <PresetDay
                key={index}
                action={setActivePreset}
                active={activePreset === option.presetTitle}
                {...option}
              />
            ))}
          </OptionsContainer>
        </GridSections>
      </Overlay>
    </PickrContainer>
  );
};
