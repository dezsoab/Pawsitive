import Button from "@/components/button/Button";
import React from "react";

import styles from "./Authenticate.module.css";

const btnStyle = {
  backgroundColor: "var(--color-pink-dark)",
  color: "var(--color-white)",
  margin: "0 2rem",
  padding: "1.5rem 3.25rem",
};

type ChoiceProps = {
  btnRefs: React.RefObject<HTMLDivElement>;
  onClick: () => void;
};

const Choice = ({ btnRefs, onClick }: ChoiceProps) => {
  return (
    <div className={styles.auth} ref={btnRefs}>
      <Button text="Sign Up" onClick={onClick} style={btnStyle} />
      <Button text="Login" onClick={onClick} style={btnStyle} />
    </div>
  );
};

export default Choice;
