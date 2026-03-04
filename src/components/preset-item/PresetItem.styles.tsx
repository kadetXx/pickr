import styled from "@emotion/styled";
import { ptr } from "@/utils";
import { PresetItemProps } from "./PresetItem";

export const StyledPreset = styled.button<Pick<PresetItemProps, "active">>`
  cursor: pointer;
  width: 100%;
  padding: ${`0 0 0 ${ptr(8)}`};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 6px;
  gap: ${ptr(12.88)};
  height: ${ptr(32)};
  border: unset;
  outline: none;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
  background-color: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.12)" : "transparent"};

  &:hover {
    background-color: ${(props) =>
      !props.active ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.12)"};
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.4);
  }
`;