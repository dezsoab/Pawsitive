import React from "react";

import styles from "./Ribbon.module.css";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["latin"],
});

interface Props {
  name: string;
}

const Ribbon = ({ name }: Props) => {
  return (
    <div className={styles.ribbon}>
      <p style={dancing.style}>{name}</p>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  );
};

export default Ribbon;
