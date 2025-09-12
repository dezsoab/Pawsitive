"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "./Paragraph.module.css";

gsap.registerPlugin(ScrollTrigger);

type ParagraphProps = {
  title: string;
  slideFrom?: number;
};

const Paragraph = ({ title, slideFrom }: ParagraphProps) => {
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        paragraphRef.current,
        { x: slideFrom, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            // markers: true,
          },
        }
      );
    }, paragraphRef);

    return () => ctx.revert(); // clean up on unmount
  }, [slideFrom]);

  return (
    <p className={styles.text} ref={paragraphRef}>
      {title}
    </p>
  );
};

export default Paragraph;
