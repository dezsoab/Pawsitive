import React from "react";
import ProductGrid from "./ProductGrid";
import { useTranslations } from "next-intl";

import styles from "./ProductSection.module.css";
import logger from "@/logging/logger";

const ProductSection = () => {
  const t = useTranslations();

  logger.info("Using Home -> product section");

  return (
    <div className={styles.products}>
      <h2>{t("Index.products.title")}</h2>
      <h3>{t("Index.products.title_secondary")}</h3>
      <div className={styles.divider}></div>
      <ProductGrid />
    </div>
  );
};

export default ProductSection;
