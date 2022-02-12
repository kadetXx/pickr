import React, { ButtonHTMLAttributes } from "react";
import { Text, Icon } from "../../shared";
import { StyledButton } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconRotation?: number;
  selectedDate:
    | "Today"
    | "Yesterday"
    | "This Monday"
    | "Last Monday"
    | `${number}/${number}/${number}`;
}

export const Button: React.VFC<ButtonProps> = ({
  icon,
  iconRotation,
  selectedDate,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      <Text size={13} color="grey">
        {selectedDate}
      </Text>

      {icon && (
        <Icon src={icon} width={10} height={10} rotation={iconRotation} />
      )}
    </StyledButton>
  );
};
