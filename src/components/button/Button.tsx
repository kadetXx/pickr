import React, { ButtonHTMLAttributes } from "react";
import { Text, Icon } from "@/shared";
import { StyledButton } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconRotation?: number;
  text: "Today" | "Yesterday" | "This Monday" | "Last Monday" | DDMMYY;
}

export const Button: React.VFC<ButtonProps> = ({
  icon,
  iconRotation,
  text,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      <Text size={13} color="grey">
        {text}
      </Text>

      {icon && (
        <Icon alt="plus icon" src={icon} width={10} height={10} rotation={iconRotation} />
      )}
    </StyledButton>
  );
};
