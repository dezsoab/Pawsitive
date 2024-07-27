import React from "react";
import { Dancing_Script } from "next/font/google";

import styles from "./Label.module.css";
import logger from "@/logging/logger";

const dancing = Dancing_Script({
  subsets: ["latin"],
});

type LabelProps = {
  title: string;
};

const Label = ({ title }: LabelProps) => {
  logger.info("Using About -> label with title: " + title);
  return <p className={`${styles.label} ${dancing.className}`}>{title}</p>;
};

export default Label;
