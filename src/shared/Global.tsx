import { Global, css } from "@emotion/react";

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        :root {
          // colors
          --col-white: #ffffff;
          --col-grey-200: #c8c7c1;
          --col-grey-100: #90908c;
          --col-grey: #706f6c;
          --col-teal: #0e9888;
        }
      `}
    />
  );
};
