import React from "react";
import styles from "./Paragraph.module.css";
import logger from "@/logging/logger";

type ParagraphProps = {
  title: string;
};

const Paragraph = ({ title }: ParagraphProps) => {
  logger.info("Using About -> paragraph with title: " + title);
  return <p className={styles.text}>{title}</p>;
};

export default Paragraph;
