"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocale } from "next-intl";

import styles from "./ProductGrid.module.css";
import { dummyProducts } from "./dummyProducts";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

const ProductGrid: React.FC = () => {
  const locale = useLocale();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        productRefs.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={gridRef} className={styles.grid}>
      {dummyProducts.map((product, index) => {
        return (
          <ProductCard
            index={product.id}
            locale={locale}
            product={product}
            productRefs={productRefs}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
