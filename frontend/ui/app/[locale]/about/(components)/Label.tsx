import React from "react";
import { Dancing_Script } from "next/font/google";

import styles from "./Label.module.css";

const dancing = Dancing_Script({
  subsets: ["latin"],
});

type LabelProps = {
  title: string;
};

const Label = ({ title }: LabelProps) => {
  return <p className={`${styles.label} ${dancing.className}`}>{title}</p>;
};

export default Label;
