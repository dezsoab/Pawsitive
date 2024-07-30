"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./ProductGrid.module.css";
import { dummyProducts } from "./dummyProducts";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

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
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            locale={locale}
          >
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
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
