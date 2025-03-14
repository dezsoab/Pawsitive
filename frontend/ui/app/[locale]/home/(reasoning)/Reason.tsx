"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Reason.module.css";

interface ReasonProps {
  amount: string;
  description: string;
}

const Reason: React.FC<ReasonProps> = ({ amount, description }) => {
  const countRef = useRef<HTMLParagraphElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const targetAmount = parseInt(amount);

  const animateCount = (target: number) => {
    const startTime = performance.now();
    const duration = 1000;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const count = Math.min(target, Math.floor((target * elapsed) / duration));

      if (countRef.current) {
        countRef.current.textContent = count + "+";
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!hasAnimated && countRef.current) {
        const rect = countRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 180 && rect.bottom > 0) {
          animateCount(targetAmount);
          setHasAnimated(true);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetAmount, hasAnimated]);

  return (
    <div className={styles.reason}>
      <p className={styles.amount} ref={countRef}>
        0
      </p>
      <p className={styles.desc}>{description}</p>
    </div>
  );
};

export default Reason;
