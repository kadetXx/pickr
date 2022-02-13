import React, { HTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledHead, Control } from "./CalendarHead.styles";

import ArrowLeft from "../../svg/icon-left.svg";
import ArrowRight from "../../svg/icon-right.svg";
export interface CalendarHeadProps extends HTMLAttributes<HTMLDivElement> {
  month: string;
  year: number;
}

export const CalendarHead: React.VFC<CalendarHeadProps> = ({ month, year }) => {
  return (
    <StyledHead>
      <Control>
        <Icon src={ArrowLeft} width={5.27} height={8.68} />
      </Control>
      <Text weight="bold" color="grey" size={13}>
        {month}, {year}
      </Text>
      <Control>
        <Icon src={ArrowRight} width={5.27} height={8.68} />
      </Control>
    </StyledHead>
  );
};
