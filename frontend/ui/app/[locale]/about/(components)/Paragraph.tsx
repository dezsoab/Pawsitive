import React from "react";
import styles from "./Paragraph.module.css";

type ParagraphProps = {
  title: string;
};

const Paragraph = ({ title }: ParagraphProps) => {
  return <p className={styles.text}>{title}</p>;
};

export default Paragraph;
