import React from "react";
import { useTranslations } from "next-intl";
import styles from "./AboutSection.module.css";
import Image from "next/image";
import DesignIcon from "./DesignIcon";
import SafetyIcon  from "./SafetyIcon";
import CalmIcon from "./CalmIcon";

const AboutSection = () => {
  const t = useTranslations();

  return (
    <section>
      <div className={styles.aboutContainer}>
        <section>
          <h1>{t("Index.about.about_heading")}</h1>
          <div className={styles.textFormating}>{t("Index.about.about_description")}</div>
        </section>
        <section>
          <Image src={"/assets/cat_about.png"} alt={"White cat"}
            width={600}
            height={450}>
          </Image>
        </section>
      </div>
      <div className={styles.featureContainer}>
        <section className={styles.container}>
          <h2>{t("Index.about.first_title")}</h2>
          <DesignIcon/>
          <div className={styles.preLine}>{t("Index.about.block_1")}</div>
        </section>
        <section className={styles.container}>
          <h2>{t("Index.about.second_title")}</h2>
          <SafetyIcon/>
          <div className={styles.preLine}>{t("Index.about.block_2")}</div>
        </section>
        <section className={styles.container}>
          <h2>{t("Index.about.third_title")}</h2>
          <CalmIcon/>
          <div className={styles.preLine}>{t("Index.about.block_2")}</div>
        </section>
      </div>
    </section>
  );
};
export default AboutSection
