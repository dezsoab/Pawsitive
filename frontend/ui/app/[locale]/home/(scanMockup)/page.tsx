import React from "react";

import mockupImage from "../../../../public/assets/scanmockup.png";
import Image from "next/image";

import styles from "./ScanMockup.module.css";
import { useTranslations } from "next-intl";

const ScanMockupSection = () => {
  const t = useTranslations("Index.mockup");
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
