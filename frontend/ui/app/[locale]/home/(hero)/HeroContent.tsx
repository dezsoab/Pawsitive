import React from "react";

import styles from "./home.module.css";
import CTAButton from "../../../../components/cta/CTAButton";
import { useLocale, useTranslations } from "next-intl";

import { navigationRoutes } from "../../../../enums/navigationRoutes";
import logger from "@/logging/logger";

const HeroContent = () => {
  const locale = useLocale();
  const t = useTranslations();

  logger.info("Using Home -> hero");

  return (
    <div className={styles.heroContent}>
      <div>
        <h1>
          {t("Index.hero.title")} <br />{" "}
        </h1>
        <p>{t("Index.hero.title_extension")}</p>
      </div>
      <p>{t("Index.hero.description")}</p>
      <CTAButton
        toPath={navigationRoutes.SHOP}
        title={t("Shop.title_secondary")}
        style={{
          backgroundColor: "var(--color-pink-mid)",
          color: "var(--color-white)",
        }}
        locale={locale}
        classList={styles.jelly}
      />
    </div>
  );
};

export default HeroContent;
