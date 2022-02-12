import styled from "@emotion/styled";

import { IconProps } from "./Icon";

export const StyledIcon = styled.img<Pick<IconProps, "width" | "height" | "rotation">>`
  margin: 0;
  vertical-align: baseline;
  width: ${(props) => `${props.width / 16}rem`}
  height: ${(props) => `${props.height / 16}rem`}
  transform: ${props => props.rotation ? `rotate(${props.rotation}deg)` : "initial"}
`;
