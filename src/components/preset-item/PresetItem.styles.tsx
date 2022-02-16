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
  transition: all 0.1s linear;
  background-color: ${(props) =>
    props.active ? "var(--col-grey-600)" : "initial"};

  &:hover {
    background-color: ${(props) =>
      !props.active ? "var(--col-grey-400)" : "var(--col-grey-600)"};
  }
`;