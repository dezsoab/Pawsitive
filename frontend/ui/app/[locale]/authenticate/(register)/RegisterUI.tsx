import React from "react";
import RegisterForm from "./RegisterForm";
import styles from "./RegisterUI.module.css";
import LeftPanel from "../left_panel/LeftPanel";

const RegisterUI = () => {
  return (
    <div className={styles.wrapper}>
      <LeftPanel />
      <RegisterForm />
    </div>
  );
};

export default RegisterUI;
