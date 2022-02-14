import styled from "@emotion/styled";
import { ptr } from "../../utils";
import { ButtonProps } from "..";

export const StyledButton = styled.button<Pick<ButtonProps, 'disabled'>>`
  cursor: pointer;
  position: relative;
  width: fit-content;
  border: 1px solid black;
  font-family: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${ptr(135)};
  height: ${ptr(29)};
  border-radius: 8px;
  padding: 0 ${ptr(14)};
  border: 1px solid var(--col-grey-300);
  box-shadow: 0px 1px 0px rgba(20, 20, 0, 0.051);
  opacity: ${(props) => (props.disabled ? 0.5 : "initial")};
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
  user-select: ${(props) => (props.disabled ? "none" : "initial")};
  background-color: ${props => props.disabled ? 'var(--col-grey-300)' : 'var(--col-white)'};
`;
