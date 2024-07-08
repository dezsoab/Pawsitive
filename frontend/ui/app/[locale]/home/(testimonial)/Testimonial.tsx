import React from "react";

import styles from "./Testimonial.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Star from "./Star";

const Testimonial = () => {
  const t = useTranslations("Index.testimonial");
  return (
    <section className={styles.testi}>
      <h3>{t("title")}</h3>
      <Image
        src="/assets/customer.png"
        width={70}
        height={70}
        alt="Dobrean Alexander"
      />
      <h5>Dobrean Alexander</h5>
      <p>{t("customer_adjective")}</p>
      <div>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
    </section>
  );
};

export default Testimonial;
