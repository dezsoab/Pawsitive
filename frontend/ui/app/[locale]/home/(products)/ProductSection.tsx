import React from "react";
import ProductGrid from "./ProductGrid";
import { useTranslations } from "next-intl";

import styles from "./ProductSection.module.css";

const ProductSection = () => {
  const t = useTranslations();

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
