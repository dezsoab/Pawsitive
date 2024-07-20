"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { navigationRoutes } from "../../enums/navigationRoutes";
import { useLocale, useTranslations } from "next-intl";

import styles from "./NavbarMobile.module.css";
import CTAButton from "../cta/CTAButton";
import LanguagePicker from "../language/LanguagePicker";
import Hamburger from "./Hamburger";

const NavbarMobile = () => {
  const locale = useLocale();
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);

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

  const toggleNavigation = () => {
    ref.current!.classList.toggle(styles.active);
    document.body.classList.toggle(styles.noscroll); // to disable scroll underneath when menu is active
  };

  return (
    <header
      className={`${styles.navHeader} ${scrolled ? styles.scrolled : ""}`}
    >
      <Link
        href={navigationRoutes.HOME}
        locale={locale}
        className={styles.logo}
      >
        <Image
          src="/assets/logo.png"
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <Hamburger ref={ref} onClick={toggleNavigation} />
      <nav className={styles.navBarMobile}>
        <ul>
          <li>
            <Link
              href={navigationRoutes.HOME}
              locale={locale}
              onClick={toggleNavigation}
            >
              {t("Navigation.home")}
            </Link>
          </li>
          <li>
            <Link
              href={navigationRoutes.ABOUT}
              locale={locale}
              onClick={toggleNavigation}
            >
              {t("Navigation.about")}
            </Link>
          </li>
          <li>
            <Link
              href={navigationRoutes.CONTACT}
              locale={locale}
              onClick={toggleNavigation}
            >
              {t("Navigation.contact")}
            </Link>
          </li>
        </ul>
        <CTAButton
          title={t("Navigation.shop")}
          toPath={navigationRoutes.SHOP}
          style={{
            backgroundColor: "var(--color-pink-mid)",
            color: "var(--color-white)",
          }}
          locale={locale}
          onClick={toggleNavigation}
        />
        <LanguagePicker isScrolled={false} className={styles.langPick} />
      </nav>
    </header>
  );
};

export default NavbarMobile;
