import React from "react";
import styles from "./home.module.css";
import HeroContent from "./HeroContent";
import Image from "next/image";

import heroDesktop from "../../../../public/assets/ph43.JPG";
import heroMobile from "../../../../public/assets/ph44.JPG";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Desktop image */}
      <Image
        src={heroDesktop}
        alt="Showcasing our product"
        fill
        style={{ objectFit: "cover" }}
        className={styles.heroDesktop}
      />

      {/* Mobile image */}
      <Image
        src={heroMobile}
        alt="Showcasing our product"
        fill
        style={{ objectFit: "cover" }}
        className={styles.heroMobile}
      />

      <HeroContent />
    </section>
  );
};

export default HeroSection;
