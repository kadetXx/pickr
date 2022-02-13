import styled from "@emotion/styled";
import { ptr } from "../../utils";
import { CalendarDayProps } from "./CalendarDay";

interface StyledDayProps extends Pick<CalendarDayProps, "status"> {
  isClickable: boolean;
}

export const StyledDay = styled.span<StyledDayProps>`
  width: ${ptr(36)};
  height: ${ptr(36)};
  display: grid;
  place-items: center;
  border-radius: 6px;
  
  cursor: ${(props) => (props.isClickable ? "pointer" : "initial")};
  
  background-color: ${(props) =>
    props.status === "active" ? "var(--col-teal)" : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.status === "active"
        ? "var(--col-teal)"
        : props.status === "selectable"
        ? "var(--col-grey-400)"
        : "initial"}
`;
