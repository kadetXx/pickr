import React, { ButtonHTMLAttributes } from "react";
export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  selectedDate:
    | "Today"
    | "Yesterday"
    | "This Monday"
    | "Last Monday"
    | `${number}/${number}/${number}`;
}

import { StyledButton } from "./Button.styles";

export const Button: React.VFC<Props> = ({
  selectedDate,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {selectedDate}
    </StyledButton>
  );
};
