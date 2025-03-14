import React from "react";
import styles from "./LoadingProduct.module.css";

const LoadingProductCard = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={`${styles.card} ${styles.isLoading}`}>
          <div className={styles.image}></div>
          <div className={styles.content}></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingProductCard;
