import React, { ImgHTMLAttributes } from "react";

import { StyledIcon } from "./Icon.styles";

export interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  height: number;
  rotation?: number;
}

export const Icon: React.VFC<IconProps> = ({
  width,
  height,
  loading = "lazy",
  ...props
}) => {
  return (
    <StyledIcon width={width} height={height} loading={loading} {...props} />
  );
};
