import React, { HTMLAttributes } from "react";
import { StyledDay } from "./CalendarDay.styles";
import { Text } from "../../shared";

interface CalendarDayProps extends HTMLAttributes<HTMLDivElement> {
  date: string | number;
  status: "active" | "selectable" | "dormant";
}

export const CalendarDay: React.VFC<CalendarDayProps> = ({ status, date }) => {
  return (
    <StyledDay isActive={status === "active"}>
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
