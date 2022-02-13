import React, { HTMLAttributes } from "react";

export interface CalendarHeadProps extends HTMLAttributes<HTMLDivElement> {
  month: string;
  day: number;
}

export const CalendarHead: React.VFC<CalendarHeadProps> = ({ month, day }) => {
  return <div>MonthSwitcher</div>;
};
