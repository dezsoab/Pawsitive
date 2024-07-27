import React from "react";
import Link from "next/link";

import styles from "./Hero.module.css";
import { useTranslations } from "next-intl";
import { contacts } from "@/enums/contact";

const Hero = () => {
  const t = useTranslations();

  return (
    <section className={styles.hero}>
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
