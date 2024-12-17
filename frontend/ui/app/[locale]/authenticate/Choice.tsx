import Button from "@/components/button/Button";
import React, { Dispatch } from "react";

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
  setChoiceIsLogin: Dispatch<React.SetStateAction<boolean>>;
};

const Choice = ({ btnRefs, onClick, setChoiceIsLogin }: ChoiceProps) => {
  const handleLoginChoice = () => {
    setChoiceIsLogin(true);
    onClick();
  };

  const handleRegisterChoice = () => {
    setChoiceIsLogin(false);
    onClick();
  };

  return (
    <div className={styles.auth} ref={btnRefs}>
      <Button text="Sign Up" onClick={handleRegisterChoice} style={btnStyle} />
      <Button text="Login" onClick={handleLoginChoice} style={btnStyle} />
    </div>
  );
};

export default Choice;
