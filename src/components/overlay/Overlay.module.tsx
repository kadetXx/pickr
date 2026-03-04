import styled from "@emotion/styled";
import { OverlayProps } from "./Overlay";

interface StyledOverlayProps extends Pick<OverlayProps, "visible"> {
  mobile?: boolean;
}

export const Backdrop = styled.div<Pick<OverlayProps, "visible">>`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};
  transition: opacity 0.25s ease;
`;

export const HandleBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem 0 0.75rem;
  margin-bottom: -1px;
  cursor: grab;
  touch-action: none;
  background: #2c2c2a;
  position: relative;
  z-index: 1;

  &:active {
    cursor: grabbing;
  }
`;

export const Handle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
`;

export const StyledOverlay = styled.div<StyledOverlayProps>`
  --col-dark: #141400;
  --col-white: #ffffff;
  --col-grey-600: #f1f1ef;
  --col-grey-500: #f9f9f8;
  --col-grey-400: #f3f3f2;
  --col-grey-300: #e3e3e0;
  --col-grey-200: #c8c7c1;
  --col-grey-100: #90908c;
  --col-grey: #706f6c;
  --col-teal: #2c2c2a;

  z-index: 9999;
  display: grid;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 7rem;
  background-color: var(--col-white);
  font-family: "SF Pro Display", sans-serif;
  cursor: pointer;

  ${(props) =>
    props.mobile
      ? `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);
    border: none;
    max-height: 90vh;
    overflow-y: auto;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: ${props.visible ? 1 : 0};
    pointer-events: ${props.visible ? "auto" : "none"};
    transform: ${props.visible ? "translateY(0)" : "translateY(100%)"};
  `
      : `
    position: absolute;
    border-radius: 12px;
    box-shadow: 0px 1px 1px rgba(20, 20, 0, 0.1);
    border: 1px solid var(--col-grey-400);
    transition: opacity 0.25s 0.1s, transform 0.25s 0.1s, box-shadow 0.2s 0.1s;
    opacity: ${props.visible ? 1 : 0};
    pointer-events: ${props.visible ? "auto" : "none"};
    transform: ${props.visible ? "translateY(0)" : "translateY(-1.5rem)"};
    ${!props.visible ? "position: fixed; visibility: hidden;" : ""}
  `}
`;
