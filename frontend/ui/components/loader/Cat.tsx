import React from "react";
import styles from "./Cat.module.css";
import Navbar from "@/components/navigation/Navbar";

const segments = 30;

const Cat = () => {
  const segmentsArray = Array.from({ length: segments });

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div className={styles.cat} data-testid="cat-spinner">
        {segmentsArray.map((_, index) => (
          <div key={index} className={`${styles.cat__segment}`}></div>
        ))}
      </div>
    </>
  );
};

export default Cat;
