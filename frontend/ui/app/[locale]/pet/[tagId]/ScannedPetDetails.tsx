import React from "react";

import styles from "./ScannedPetDetails.module.css";
import { useTranslations } from "next-intl";

const ScannedPetDetails = () => {
  const t = useTranslations("ScannedPet");
  return (
    <div className={styles.details}>
      <p>{t("breed")}: Border Collie</p>
      <p>{t("age")}: 3 ev</p>
      <p>{t("sex")}: szuka</p>
      <p>{t("size")}: kozepes</p>
      <hr />
      <p>
        {t("address")}: Kiss Sandor Andras utca 15, Budapest 1188, Magyarorszag
      </p>
      <p>{t("tel")}:+1234364564</p>
      <p>{t("email")}: test@test.com</p>
      <hr />
      <div>
        <h1>{t("lost")}</h1>
      </div>
    </div>
  );
};

export default ScannedPetDetails;
