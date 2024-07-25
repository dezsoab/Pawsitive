import React from "react";

import styles from "./Label.module.css";

type LabelProps = {
  title: string;
};

const Label = ({ title }: LabelProps) => {
  return <p className={styles.label}>{title}</p>;
};

export default Label;
