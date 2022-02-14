import React, { ButtonHTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledPreset } from "./PresetItem.styles";

export interface PresetItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  iconAlt: string;
  active: boolean;
  presetTitle: PresetTitle;
  day: DayData;
  onClick: () => void;
}

export const PresetItem: React.VFC<PresetItemProps> = ({
  presetTitle,
  active,
  icon,
  iconAlt,
  onClick,
  ...props
}) => {
  return (
    <StyledPreset {...props} active={active} onClick={onClick}>
      <Icon width={13.13} height={15} src={active ? iconAlt : icon} />
      <Text
        size={13}
        color={active ? "teal" : "grey-100"}
        weight={active ? "bold" : "normal"}
      >
        {presetTitle}
      </Text>
    </StyledPreset>
  );
};
