"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocale } from "next-intl";

import styles from "./ProductGrid.module.css";
import ProductCard from "./ProductCard";

import prod1 from "../../../../public/assets/prod1.webp";
import prod2 from "../../../../public/assets/prod2.webp";
import prod3 from "../../../../public/assets/prod3.webp";
import prod4 from "../../../../public/assets/prod4.webp";
import prod5 from "../../../../public/assets/prod5.webp";
import prod6 from "../../../../public/assets/prod6.webp";
import prod7 from "../../../../public/assets/prod7.webp";
import prod8 from "../../../../public/assets/prod8.webp";

const products = [
  {
    id: 1,
    title: "Ember Trail",
    img: prod1,
    description: "Description for Product 1",
  },
  {
    id: 2,
    title: "Mystic Melody",
    img: prod2,
    description: "Description for Product 2",
  },
  {
    id: 3,
    title: "Aqua Aura",
    img: prod3,
    description: "Description for Product 3",
  },
  {
    id: 4,
    title: "Rainbow Realm",
    img: prod4,
    description: "Description for Product 4",
  },
  {
    id: 5,
    title: "Whispering Woods",
    img: prod5,
    description: "Description for Product 5",
  },
  {
    id: 6,
    title: "Cosmic Comfort",
    img: prod6,
    description: "Description for Product 6",
  },
  {
    id: 7,
    title: "Phoenix Flame",
    img: prod7,
    description: "Description for Product 7",
  },
  {
    id: 8,
    title: "Mossheart",
    img: prod8,
    description: "Description for Product 8",
  },
];

gsap.registerPlugin(ScrollTrigger);

const ProductGrid: React.FC = () => {
  const locale = useLocale();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imgs = gridRef.current?.querySelectorAll("img") || [];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imgs.length) startAnimation();
    };

    imgs.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener("load", checkAllLoaded);
        img.addEventListener("error", checkAllLoaded);
      }
    });

    function startAnimation() {
      if (gridRef.current) {
        gsap.fromTo(
          productRefs.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 50%",
              end: "bottom center",
              toggleActions: "play none none none",
              // markers: true,
            },
          }
        );
      }
    }
  }, []);

  return (
    <div ref={gridRef} className={styles.grid}>
      {products.map((product, index) => {
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
