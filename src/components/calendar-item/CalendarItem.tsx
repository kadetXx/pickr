import React, { HTMLAttributes } from "react";
import { StyledDay } from "./CalendarItem.styles";
import { Text } from "@/shared";

export interface CalendarItemProps extends HTMLAttributes<HTMLDivElement> {
  date: string | number;
  status: "active" | "selectable" | "dormant";
  onClick?: () => void;
}

export const CalendarItem: React.VFC<CalendarItemProps> = ({
  status,
  date,
  onClick,
  ...props
}) => {
  return (
    <StyledDay
      {...props}
      status={status}
      isClickable={!!onClick}
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
