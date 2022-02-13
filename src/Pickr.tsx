import React, {
  useState,
  useEffect,
  useLayoutEffect,
  HTMLAttributes,
} from "react";

import { PickrContainer, PickrSections, PickrPresets, PickrCalendar } from "./Pickr.styles";
import { Button, Overlay, PresetItem, PresetItemProps } from "./components";

import { presetDays } from "./constants";
import PlusIcon from "./svg/icon-plus.svg";

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
  const [activePreset, setActivePreset] = useState<PresetItemProps["presetTitle"]>("Today");

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
            Hi
          </PickrCalendar>
        </PickrSections>
      </Overlay>
    </PickrContainer>
  );
};
