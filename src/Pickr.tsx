import React, { useState } from "react";
import { PickrContainer } from "./Pickr.styles";

import { Button } from "./components";
import PlusIcon from "./svg/icon-plus.svg";

interface Props {
  disabled?: boolean;
  showCalendar: boolean;
  openByDefault: boolean;
  closeOnBlur: boolean;
}

export const Pickr: React.VFC<Props> = ({ disabled }) => {
  const [showCalendar, setShowcalendar] = useState<boolean>(false);

  const handleClick = () => {
    setShowcalendar(!showCalendar);
  }

  return (
    <PickrContainer>
      <Button
        selectedDate="Today"
        disabled={disabled}
        icon={PlusIcon}
        iconRotation={showCalendar ? 45 : 0}
        onClick = {handleClick}
      />
    </PickrContainer>
  );
};
