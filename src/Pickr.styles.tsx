import styled from "@emotion/styled";
import { ptr } from "./utils";

export const PickrContainer = styled.div`
  // font
  @import url("http://fonts.cdnfonts.com/css/sf-pro-display");

  // colors
  --col-dark: #141400;
  --col-white: #ffffff;
  --col-grey-600: #f1f1ef;
  --col-grey-500: #f9f9f8;
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

export const PickrSections = styled.div`
  display: grid;
  min-height: ${ptr(297)};
  box-sizing: border-box;
  grid-template-columns: ${`${ptr(183)} ${ptr(275)}`};
`;

export const PickrPresets = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  row-gap: ${ptr(3)};
  background-color: var(--col-grey-500);
  padding: ${`${ptr(24)} ${ptr(17)} ${ptr(24)} ${ptr(25)}`};
`;

export const PickrCalendar = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: ${ptr(25)};
  padding: ${`${ptr(24)} ${ptr(37)} ${ptr(34)} ${ptr(12)}`};
`;

export const CalendarBody = styled.div`
  display: grid;
  height: fit-content;
  grid-template-columns: repeat(7, 1fr);
`;
