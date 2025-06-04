import React from "react";

import styles from "./BackButton.module.css";

const BackButton = ({ onClick }: any) => {
  return (
    <button className={styles.backBtn} onClick={onClick} type="button">
      BACK
    </button>
  );
};

export default BackButton;
