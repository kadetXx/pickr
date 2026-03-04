import styled from "@emotion/styled";
import { ptr } from "@/utils";
import { CalendarItemProps } from "./CalendarItem";

interface StyledDayProps extends Pick<CalendarItemProps, "status"> {
  isClickable: boolean;
}

export const StyledDay = styled.span<StyledDayProps>`
  width: ${ptr(36)};
  height: ${ptr(36)};
  display: grid;
  place-items: center;
  border-radius: 6px;
  outline: none;
  cursor: ${(props) => (props.isClickable ? "pointer" : "initial")};
  transition: background-color 0.15s ease, box-shadow 0.15s ease,
    transform 0.1s ease;
  background-color: ${(props) =>
    props.status === "active" ? "var(--col-teal)" : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.status === "active"
        ? "var(--col-teal)"
        : props.status === "selectable"
        ? "var(--col-grey-400)"
        : "initial"};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--col-teal);
  }

  &:active {
    transform: ${(props) => (props.isClickable ? "scale(0.92)" : "none")};
  }
`;
