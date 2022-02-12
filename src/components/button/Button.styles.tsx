import styled from "@emotion/styled";
import { ptr } from "../../utils";

export const StyledButton = styled.button`
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
  background-color: var(--col-white);
  border: 1px solid var(--col-grey-300);
  box-shadow: 0px 1px 0px rgba(20, 20, 0, 0.051);
`;
