import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./AboutSection.module.css";
import DesignIcon from "./DesignIcon";
import SafetyIcon from "./SafetyIcon";
import CalmIcon from "./CalmIcon";
import logger from "@/logging/logger";

const AboutSection = () => {
  const t = useTranslations();
  logger.info("Using Home -> about");

  return (
    <section>
      <div className={styles.aboutContainer}>
        <section className={styles.imageSection}>
          <Image
            src={"/assets/showcase2.webp"}
            alt="Product showcase"
            width={500}
            height={500}
          />
        </section>
        <section className={styles.textContent}>
          <h1>{t("Index.about.about_heading")}</h1>
          <p className={styles.textFormating}>
            {t("Index.about.about_description")}
          </p>
        </section>
      </div>
      <div className={styles.featureContainer}>
        <div>
          <section className={styles.featureItem}>
            <DesignIcon />
            <div className={styles.featureText}>
              <h2>{t("Index.about.first_title")}</h2>
              <p>{t("Index.about.block_1")}</p>
            </div>
          </section>
          <section className={styles.featureItem}>
            <SafetyIcon />
            <div className={styles.featureText}>
              <h2>{t("Index.about.second_title")}</h2>
              <p>{t("Index.about.block_2")}</p>
            </div>
          </section>
          <section className={styles.featureItem}>
            <CalmIcon />
            <div className={styles.featureText}>
              <h2>{t("Index.about.third_title")}</h2>
              <p>{t("Index.about.block_3")}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
