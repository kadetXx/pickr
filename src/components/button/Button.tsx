import React, { ButtonHTMLAttributes } from "react";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  date: string;
}

export const Button: React.VFC<Props> = ({ date, ...props }) => {
  return (
    <button {...props} className="pickr__button">
      {date}
    </button>
  );
};
