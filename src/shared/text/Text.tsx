import React, { HTMLAttributes } from "react";
import { StyledText } from "./Text.styles";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: number;
  weight?: "normal" | "bold";
  color?: "white" | "teal" | "grey" | "grey-100" | "grey-200";
}

export const Text: React.FC<TextProps> = ({
  children,
  weight = "normal",
  color = "grey",
  ...props
}) => {
  return (
    <>
      <StyledText color={color} weight={weight} {...props}>
        {children}
      </StyledText>
    </>
  );
};
