import styled from "@emotion/styled";
import { ptr } from "../../utils";
import { OverlayProps } from "./Overlay";

export const StyledOverlay = styled.div<Pick<OverlayProps, "visible">>`
  z-index: 3;
  display: grid;
  position: absolute;
  left: 0;
  padding: 0;
  box-sizing: border-box;
  top: ${`calc(100% + ${ptr(8)})`};
  overflow: hidden;
  border-radius: 12px;
  min-width: 100%;
  max-width: ${ptr(458)};
  min-height: 7rem;
  max-height: ${ptr(458)};
  box-shadow: 0px 1px 1px rgba(20, 20, 0, 0.051);
  transition: opacity 0.25s 0.1s, transform 0.25s 0.1s, box-shadow 0.2ms 0.1ms;
  background-color: var(--col-white);
  border: 1px solid var(--col-grey-400);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};
  transform: ${(props) => (props.visible ? 'translateY(0)' : 'translateY(-1.5rem)')} ;
`;
