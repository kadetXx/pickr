import React from "react";
import "./Pickr.scss";
import "../styles/index.scss";

interface Props {
  name: string;
}

export const Pickr: React.VFC<Props> = ({ name }) => {
  return <button className="pickr">{name}</button>;
};
