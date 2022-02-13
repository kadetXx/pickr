import styled from "@emotion/styled";
import { ptr } from "../../utils";

interface Props {
  isActive: boolean
}

export const StyledDay = styled.span<Props>`
  width: ${ptr(36)};
  height: ${ptr(36)};
  display: grid;
  place-items: center;
  border-radius: 6px;
  background-color: ${props => props.isActive ? 'var(--col-teal)' : 'transparent'}
`