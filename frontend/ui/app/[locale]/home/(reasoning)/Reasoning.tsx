import React from "react";
import styles from "./Reasoning.module.css";
import { useTranslations } from "next-intl";
import Reason from "./Reason";

const Reasoning = () => {
  const t = useTranslations("Index.reasoning");
  return (
    <section className={styles.reasoning}>
      <h6>{t("title")}</h6>
      <p className={styles.reasoning_title_secondary}>{t("title_secondary")}</p>
      <div>
        <Reason amount={t("reason1_amount")} description={t("reason_1")} />
        <Reason amount={t("reason2_amount")} description={t("reason_2")} />
        <Reason amount={t("reason3_amount")} description={t("reason_3")} />
      </div>
    </section>
  );
};

export default Reasoning;
