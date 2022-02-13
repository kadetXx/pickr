import React, { HTMLAttributes } from "react";
import { StyledDay } from "./CalendarDay.styles";
import { Text } from "../../shared";

export interface CalendarDayProps extends HTMLAttributes<HTMLDivElement> {
  date: string | number;
  status: "active" | "selectable" | "dormant";
  onClick?: () => void;
}

export const CalendarDay: React.VFC<CalendarDayProps> = ({
  status,
  date,
  onClick,
}) => {
  return (
    <StyledDay status={status} isClickable={!!onClick} onClick={onClick}>
      <Text
        size={13}
        weight="bold"
        color={
          status === "active"
            ? "white"
            : status === "selectable"
            ? "grey"
            : "grey-200"
        }
      >
        {date}
      </Text>
    </StyledDay>
  );
};
