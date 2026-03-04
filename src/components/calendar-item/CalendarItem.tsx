import React, { HTMLAttributes } from "react";
import { StyledDay } from "./CalendarItem.styles";
import { Text } from "@/shared";

export interface CalendarItemProps extends HTMLAttributes<HTMLDivElement> {
  date: string | number;
  status: "active" | "selectable" | "dormant";
  isToday?: boolean;
  onClick?: () => void;
}

export const CalendarItem: React.VFC<CalendarItemProps> = ({
  status,
  date,
  isToday,
  onClick,
  ...props
}) => {
  return (
    <StyledDay
      {...props}
      status={status}
      isClickable={!!onClick}
      isToday={!!isToday}
      onClick={onClick}
    >
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
