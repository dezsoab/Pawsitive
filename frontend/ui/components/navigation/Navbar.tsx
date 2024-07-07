import React from "react";
import Link from "next/link";
import Image from "next/image";
import CTAButton from "../cta/CTAButton";

import styles from "./Navbar.module.css";

import { useLocale, useTranslations } from "next-intl";

const Navbar = () => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <nav className={styles.navBar}>
      <Link href="home" locale={locale}>
        <Image
          src="/assets/logo.png"
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <ul>
        <li>
          <Link href="home">{t("Navigation.home")}</Link>
        </li>
        <li>
          <Link href="about">{t("Navigation.about")}</Link>
        </li>
        <li>
          <Link href="contact" locale={locale}>
            {t("Navigation.contact")}
          </Link>
        </li>
      </ul>
      <CTAButton
        title={t("Navigation.shop")}
        toPath="shop"
        style={{
          backgroundColor: "var(--color-pink-light)",
          color: "var(--color-white)",
        }}
        locale={locale}
      />
    </nav>
  );
};

export default Navbar;
