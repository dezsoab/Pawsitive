import React from "react";
import Link from "next/link";

import styles from "./Hero.module.css";
import { useTranslations } from "next-intl";
import { contacts } from "@/enums/contact";
import logger from "@/logging/logger";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations();
  logger.info("Using Contact -> hero");

  return (
    <section className={styles.hero}>
      <Image
        src="/assets/duett1-landscape.webp"
        alt="Hero image"
        fill
        style={{ objectFit: "cover", objectPosition: "center 12%" }}
        priority
      />
      <div>
        <h1>{t("Contact.hero.title")}</h1>
        <p>{t("Contact.hero.description")}</p>
        <Link href={`mailto:${contacts.EMAIL}`}>
          <button>{t("Contact.hero.email_btn")}</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
