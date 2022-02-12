import React, { ImgHTMLAttributes } from "react";

import { StyledIcon } from "./Icon.styles";

export interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
  rotation?: number;
}

export const Icon: React.VFC<IconProps> = ({ loading = "lazy", ...props }) => {
  return <StyledIcon loading={loading} {...props} />;
};
