import { useTranslations } from "next-intl";
import React from "react";

import styles from "./GetInTouch.module.css";
import EmailIcon from "./EmailIcon";

interface GetInTouchProps {
  title: string;
  paragraph: string;
}

const GetInTouch = ({ title, paragraph }: GetInTouchProps) => {
  const t = useTranslations("Index.contact");
  return (
    <div className={styles.area}>
      <EmailIcon />
      <p>{title}</p>
      <p>{paragraph}</p>
    </div>
  );
};

export default GetInTouch;
