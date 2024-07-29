"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Paragraph.module.css";

type ParagraphProps = {
  title: string;
  slideFrom?: number;
};

const Paragraph = ({ title, slideFrom }: ParagraphProps) => {
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      paragraphRef.current,
      { x: slideFrom, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 90%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <p className={styles.text} ref={paragraphRef}>
      {title}
    </p>
  );
};

export default Paragraph;
