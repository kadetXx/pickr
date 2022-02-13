import React, { HTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledPreset } from "./PresetDay.styles";

export interface PresetDayProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  icon: string;
  iconAlt: string;
  presetTitle: "Today" | "Yesterday" | "This Monday" | "Last Monday" | "Custom";
  action: (text: this["presetTitle"]) => void;
}

export const PresetDay: React.VFC<PresetDayProps> = ({
  presetTitle,
  active,
  icon,
  iconAlt,
  action,
}) => {
  return (
    <StyledPreset active={active} onClick={() => action(presetTitle)}>
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
