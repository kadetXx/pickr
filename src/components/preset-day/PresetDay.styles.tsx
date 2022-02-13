import styled from "@emotion/styled";
import { PresetDayProps } from "./PresetDay";
import { ptr } from "../../utils";

export const StyledPreset = styled.div<Pick<PresetDayProps, "active">>`
  cursor: pointer;
  padding: ${`0 0 0 ${ptr(8)}`};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 6px;
  gap: ${ptr(12.88)};
  height: ${ptr(32)};
  background-color: ${(props) =>
    props.active ? "var(--col-grey-600)" : "initial"};
`;
