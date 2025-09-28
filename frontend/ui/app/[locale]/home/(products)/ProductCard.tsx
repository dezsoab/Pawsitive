import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "./ProductGrid.module.css";

interface Product {
  id: number;
  title: string;
  img: StaticImageData;
  description: string;
  href: string;
}

interface ProductCardProps {
  product: Product;
  locale: string;
  index: number;
  productRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  productRefs,
}) => {
  return (
    <a
      key={product.id}
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        ref={(el) => {
          productRefs.current[index] = el;
        }}
        className={`${styles.product_card} ${styles.hidden}`}
      >
        <Image
          src={product.img}
          alt={product.description}
          width={300}
          height={300}
        />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </a>
  );
};

export default ProductCard;
