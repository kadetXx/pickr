import React, { HTMLAttributes } from "react";
import { StyledOverlay } from "./Overlay.module";

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({ children, visible }) => {
  return <StyledOverlay visible={visible}>{children}</StyledOverlay>;
};
