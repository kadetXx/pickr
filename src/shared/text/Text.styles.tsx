import styled from "@emotion/styled";
import { ptr } from "../../utils";
import { TextProps } from "./Text";

export const StyledText = styled.p<Pick<TextProps, "color" | "weight" | "size">>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  font-family: inherit;
  font-size: ${props => props.size ? ptr(props.size) : 'inherit'};
  font-weight: ${(props) => props.weight === 'bold' ? 600 : 400};
  color: ${(props) => `var(--col-${props.color})`};
`;
