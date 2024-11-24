import React from "react";

type BtnProps = {
  onClick: () => void;
};

const ScrollUpBtn = ({ onClick }: BtnProps) => {
  return <button onClick={onClick}>⬆️</button>;
};

export default ScrollUpBtn;
