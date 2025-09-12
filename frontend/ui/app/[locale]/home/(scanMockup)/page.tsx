import React from "react";

import mockupImageHU from "../../../../public/assets/mockup_hu.png";
import mockupImageDE from "../../../../public/assets/mockup_de.png";
import mockupImageEN from "../../../../public/assets/mockup_en.png";

import Image, { StaticImageData } from "next/image";

import styles from "./ScanMockup.module.css";
import { useLocale, useTranslations } from "next-intl";

const ScanMockupSection = () => {
  const t = useTranslations("Index.mockup");
  const locale = useLocale();

  type SupportedLocale = "hu" | "de" | "en";

  const mockupImages: Record<SupportedLocale, StaticImageData> = {
    hu: mockupImageHU,
    de: mockupImageDE,
    en: mockupImageEN,
  };

  const mockupImage = mockupImages[locale as SupportedLocale] || mockupImageEN;

  return (
    <section className={styles.mockupSection}>
      <div className={styles.wrapper}>
        <div className={styles.textContent}>
          <h1>{t("title")}</h1>
          <p>{t("p1")}</p>
          <br />
          <br />
          <p>{t("p2")}</p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            alt="Software product shown on an iPhone"
            src={mockupImage}
            priority
            sizes="(max-width: 768px) 50vw, 600px"
          />
        </div>
      </div>
    </section>
  );
};

export default ScanMockupSection;
