import React from "react";
import styles from "./CTASection.module.css";
import { useLocale, useTranslations } from "next-intl";
import CTAButton from "@/components/cta/CTAButton";

import { navigationRoutes } from "../../../../enums/navigationRoutes";

const CTASection = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={styles.cta}>
      <h4>{t("Index.ctasection.title")}</h4>
      <p>{t("Index.ctasection.title_secondary")}</p>
      <div>
        <CTAButton
          locale={locale}
          toPath={navigationRoutes.SHOP}
          style={{
            backgroundColor: "var(--color-pink-mid)",
            color: "var(--color-white)",
            marginRight: "1rem",
          }}
          title={t("Navigation.shop")}
        />

        <CTAButton
          locale={locale}
          toPath={navigationRoutes.ABOUT}
          style={{
            backgroundColor: "transparent",
            color: "var(--color-pink-mid)",
          }}
          title={t("Navigation.about")}
        />
      </div>
    </section>
  );
};

export default CTASection;
