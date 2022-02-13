import React, { HTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledPreset } from "./PresetDay.styles";

export interface PresetDayProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  icon: string;
  iconAlt: string;
  text: "Today" | "Yesterday" | "This Monday" | "Last Monday" | "Custom";
}

export const PresetDay: React.VFC<PresetDayProps> = ({
  text,
  active,
  icon,
  iconAlt,
}) => {
  return (
    <StyledPreset active={active}>
      <Icon width={13.13} height={15} src={active ? iconAlt : icon} />
      <Text
        size={13}
        color={active ? "teal" : "grey-100"}
        weight={active ? "bold" : "normal"}
      >
        {text}
      </Text>
    </StyledPreset>
  );
};
