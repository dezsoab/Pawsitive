import { useTranslations } from "next-intl";
import React from "react";
import EmailIcon from "./EmailIcon";

import styles from "./GetInTouch.module.css";

const GetInTouch = () => {
  const t = useTranslations("Index.contact");
  return (
    <div className={styles.area}>
      <EmailIcon />
      <p>{t("title")}</p>
      <p>{t("paragraph")}</p>
    </div>
  );
};

export default GetInTouch;
