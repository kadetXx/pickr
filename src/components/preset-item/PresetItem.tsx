import React, { HTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledPreset } from "./PresetItem.styles";

import { DayData } from "../../utils";

export interface PresetItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  iconAlt: string;
  active: boolean;
  presetTitle: "Today" | "Yesterday" | "This Monday" | "Last Monday" | "Custom";
  day: DayData;
  onClick: () => void;
}

export const PresetItem: React.VFC<PresetItemProps> = ({
  presetTitle,
  active,
  icon,
  iconAlt,
  day,
  onClick,
}) => {
  return (
    <StyledPreset active={active} onClick={onClick}>
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
