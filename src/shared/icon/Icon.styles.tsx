import styled from "@emotion/styled";
import { ptr } from "@/utils";
import { IconProps } from "./Icon";

export const StyledIcon = styled.img<Pick<IconProps, "width" | "height" | "rotation">>`
  margin: 0;
  vertical-align: baseline;
  width: ${(props) => ptr(props.width)};
  height: ${(props) => ptr(props.height)};
  transform: ${props => props.rotation ? `rotate(${props.rotation}deg)` : "initial"};
  transition: transform 0.2s linear;
`;
