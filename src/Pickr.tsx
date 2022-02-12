import React from "react";
import { PickrContainer } from "./Pickr.styles";

import { Button } from "./components";
import PlusIcon from "./svg/icon-plus.svg";

interface Props {
  disabled?: boolean;
}

export const Pickr: React.VFC<Props> = ({ disabled }) => {
  return (
    <PickrContainer>
      <Button disabled={disabled} icon={PlusIcon} selectedDate="Today" />
    </PickrContainer>
  );
};
