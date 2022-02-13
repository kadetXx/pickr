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
  const presetDays: PresetDayProps[] = [
    {
      text: "Today",
      active: true,
      icon: CalendarStarIcon,
      iconAlt: CalendarStarIconTeal,
    },
    {
      text: "Yesterday",
      active: false,
      icon: CalendarStarIcon,
      iconAlt: CalendarStarIconTeal,
    },
    {
      text: "This Monday",
      active: false,
      icon: CalendarStarIcon,
      iconAlt: CalendarStarIconTeal,
    },
    {
      text: "Last Monday",
      active: false,
      icon: CalendarStarIcon,
      iconAlt: CalendarStarIconTeal,
    },
    {
      text: "Custom",
      active: false,
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
              <PresetDay key={index} {...option} />
            ))}
          </OptionsContainer>
        </GridSections>
      </Overlay>
    </PickrContainer>
  );
};
