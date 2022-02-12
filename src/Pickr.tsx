import React from "react";
import { PickrContainer } from "./Pickr.styles";

import { Button } from "./components";
import { GlobalStyles } from "./shared";

interface Props {
  disabled?: boolean;
}

export const Pickr: React.VFC<Props> = ({ disabled }) => {
  return (
    <>
      <GlobalStyles />
      <PickrContainer>
        <Button disabled={disabled} selectedDate="Today" />
      </PickrContainer>
    </>
  );
};
