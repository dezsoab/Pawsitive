import React from "react";
import styles from "./home.module.css";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <HeroContent />
    </section>
  );
};

export default HeroSection;
