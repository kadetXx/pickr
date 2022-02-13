import styled from "@emotion/styled";
import { ptr } from "./utils";

export const PickrContainer = styled.div`
  // font
  @import url("http://fonts.cdnfonts.com/css/sf-pro-display");

  // colors
  --col-dark: #141400;
  --col-white: #ffffff;
  --col-grey-500: #F9F9F8;
  --col-grey-400: #f3f3f2;
  --col-grey-300: #e3e3e0;
  --col-grey-200: #c8c7c1;
  --col-grey-100: #90908c;
  --col-grey: #706f6c;
  --col-teal: #0e9888;

  width: fit-content;
  position: relative;
  font-family: "SF Pro Display", sans-serif;
`;

export const GridSections = styled.div`
  display: grid;
  min-height: 100%;
  box-sizing: border-box;
  grid-template-columns: ${`${ptr(183)} ${ptr(275)}`};
`;

export const PresetOptions =  styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background-color: var(--col-grey-500);
  padding: ${`${ptr(24)} ${ptr(17)} ${ptr(24)} ${ptr(25)}`}
`