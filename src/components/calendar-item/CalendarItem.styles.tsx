import styled from "@emotion/styled";
import { ptr } from "@/utils";
import { CalendarItemProps } from "./CalendarItem";

interface StyledDayProps extends Pick<CalendarItemProps, "status"> {
  isClickable: boolean;
  isToday: boolean;
}

export const StyledDay = styled.span<StyledDayProps>`
  width: ${ptr(36)};
  height: ${ptr(36)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  position: relative;

  &::after {
    content: '';
    display: ${(props) => (props.isToday ? "block" : "none")};
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.status === "active" ? "var(--col-white)" : "var(--col-teal)"};
    position: absolute;
    bottom: 3.75px;
  }
  outline: none;
  cursor: ${(props) => (props.isClickable ? "pointer" : "initial")};
  transition: box-shadow 0.15s ease;
  background-color: ${(props) =>
    props.status === "active" ? "var(--col-teal)" : "transparent"};

  @media (hover: hover) {
    &:hover {
      background-color: ${(props) =>
        props.status === "active"
          ? "var(--col-teal)"
          : props.status === "selectable"
          ? "var(--col-grey-400)"
          : "initial"};
    }

    &:active {
      transform: ${(props) => (props.isClickable ? "scale(0.92)" : "none")};
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--col-teal);
  }
`;
