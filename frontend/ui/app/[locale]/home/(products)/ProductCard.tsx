import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductGrid.module.css";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  locale: string;
  index: number;
  productRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  locale,
  index,
  productRefs,
}) => {
  return (
    <Link key={product.id} href={`/product/${product.id}`} locale={locale}>
      <div
        ref={(el) => {
          productRefs.current[index] = el;
        }}
        className={`${styles.product_card} ${styles.hidden}`}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
        />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;