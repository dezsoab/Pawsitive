import React from "react";

import styles from "./ProductGrid.module.css";
import { dummyProducts } from "./dummyProducts";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

const ProductGrid = () => {
  const locale = useLocale();

  return (
    <div className={styles.grid}>
      {dummyProducts.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} locale={locale}>
          <div className={styles.product_card}>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
            />

            <h3>{product.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
