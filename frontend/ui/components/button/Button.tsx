import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  style?: {};
  onClick?: () => void;
};

const Button = ({ text, style, onClick }: ButtonProps) => {
  return (
    <button style={style} onClick={onClick} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
