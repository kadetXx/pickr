import React, { HTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledHead, Control } from "./CalendarHead.styles";

import ArrowLeft from "../../svg/icon-left.svg";
import ArrowRight from "../../svg/icon-right.svg";
export interface CalendarHeadProps extends HTMLAttributes<HTMLDivElement> {
  month: string;
  year: number;
  action: (direction: "prev" | "next") => void;
}

export const CalendarHead: React.VFC<CalendarHeadProps> = ({
  month,
  year,
  action,
}) => {
  return (
    <StyledHead>
      <Control onClick={() => action("prev")} aria-label="Move To Last Month">
        <Icon src={ArrowLeft} width={5.27} height={8.68} alt="ArrowLeft" />
      </Control>
      <Text weight="bold" color="grey" size={13}>
        {month}, {year}
      </Text>
      <Control onClick={() => action("next")} aria-label="Move To Next Month">
        <Icon src={ArrowRight} width={5.27} height={8.68} alt="ArrowRight" />
      </Control>
    </StyledHead>
  );
};
