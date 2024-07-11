"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CTAButton from "../cta/CTAButton";

import styles from "./Navbar.module.css";

import { useLocale, useTranslations } from "next-intl";
import LanguagePicker from "../language/LanguagePicker";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const locale = useLocale();
  const t = useTranslations();

  return (
    <nav className={`${styles.navBar} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/home" locale={locale}>
        <Image
          src="/assets/logo.png"
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <ul>
        <li>
          <Link href="/home" locale={locale}>
            {t("Navigation.home")}
          </Link>
        </li>
        <li>
          <Link href="/about" locale={locale}>
            {t("Navigation.about")}
          </Link>
        </li>
        <li>
          <Link href="/contact" locale={locale}>
            {t("Navigation.contact")}
          </Link>
        </li>
      </ul>
      <CTAButton
        title={t("Navigation.shop")}
        toPath="/shop"
        style={{
          backgroundColor: "var(--color-pink-mid)",
          color: "var(--color-white)",
        }}
        locale={locale}
      />
      <LanguagePicker isScrolled={scrolled} />
    </nav>
  );
};

export default Navbar;
