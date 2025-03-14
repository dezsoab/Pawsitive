import React from "react";

import styles from "./Ribbon.module.css";

interface Props {
  name: string;
}

const Ribbon = ({ name }: Props) => {
  return (
    <div className={styles.ribbon} data-name={name}>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  );
};

export default Ribbon;
