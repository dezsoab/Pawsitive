"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocale } from "next-intl";

import styles from "./ProductGrid.module.css";
import ProductCard from "./ProductCard";

import prod1 from "../../../../public/assets/prod1.JPEG";
import prod2 from "../../../../public/assets/prod2.JPEG";
import prod3 from "../../../../public/assets/prod3.jpg";
import prod4 from "../../../../public/assets/prod4.JPEG";
import prod5 from "../../../../public/assets/prod5.jpg";
import prod6 from "../../../../public/assets/prod6.JPEG";
import prod7 from "../../../../public/assets/prod7.JPEG";
import prod8 from "../../../../public/assets/prod8.JPEG";

const products = [
  {
    id: 1,
    title: "Solin",
    img: prod1,
    description: "Meet Solin - The Play Leash",
    href: "https://shop.pawsitivecollar.com/products/solin",
  },
  {
    id: 2,
    title: "Pyrris",
    img: prod2,
    description: "Meet Pyrris – The Flame Reborn Collar",
    href: "https://shop.pawsitivecollar.com/products/pyrris",
  },
  {
    id: 3,
    title: "Accira",
    img: prod3,
    description: "Meet Accira – The Summoner’s Collar",
    href: "https://shop.pawsitivecollar.com/products/accira",
  },
  {
    id: 4,
    title: "Nexis",
    img: prod4,
    description: "Meet Nexis – The Triple Flow Leash",
    href: "https://shop.pawsitivecollar.com/products/nexis",
  },
  {
    id: 5,
    title: "Protegon",
    img: prod5,
    description: "Meet Protegon – The Guardian Spirit’s Collar",
    href: "https://shop.pawsitivecollar.com/products/protegon",
  },
  {
    id: 6,
    title: "Veyra",
    img: prod6,
    description: "Meet Veyra – The Twin Currents Collar",
    href: "https://shop.pawsitivecollar.com/products/veyra",
  },
  {
    id: 7,
    title: "Lumora",
    img: prod7,
    description: "Meet Lumora – The Light Bringer`s Collar",
    href: "https://shop.pawsitivecollar.com/products/lumora",
  },
  {
    id: 8,
    title: "Pixa",
    img: prod8,
    description: "Meet Pixa – The Little Wonder Collar",
    href: "https://shop.pawsitivecollar.com/products/pixa",
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
