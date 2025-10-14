"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logoImg from "../../public/assets/logo.png";

import { navigationRoutes } from "../../enums/navigationRoutes";
import { useLocale, useTranslations } from "next-intl";

import styles from "./NavbarMobile.module.css";
import CTAButton from "../cta/CTAButton";
import LanguagePicker from "../language/LanguagePicker";
import Hamburger from "./Hamburger";
import { useAuth } from "@/context/AuthContext";

const NavbarMobile = () => {
  const locale = useLocale();
  const t = useTranslations();

  const local = locale === "hu" || locale === "de" ? locale : ""; //shop defaults to english without locale

  const ref = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();

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

  const renderLoadingScreen = () => {
    ref.current?.classList.remove(styles.active);
    document.body.classList.remove(styles.noscroll);
  };

  const authBtn = isLoggedIn ? (
    <li>
      <Link
        href={navigationRoutes.LOGOUT}
        locale={locale}
        onClick={toggleNavigation}
      >
        {t("Navigation.logout")}
      </Link>
    </li>
  ) : (
    <li>
      <Link
        href={navigationRoutes.AUTH}
        locale={locale}
        onClick={renderLoadingScreen}
      >
        {t("Navigation.login")}
      </Link>
    </li>
  );

  return (
    <header
      className={`${styles.navHeader} ${scrolled ? styles.scrolled : ""}`}
    >
      <Link href={""} locale={locale} className={styles.logo}>
        <Image
          src={logoImg}
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <Hamburger ref={ref} onClick={toggleNavigation} />
      <nav className={styles.navBarMobile}>
        <ul>
          {isLoggedIn && (
            <li>
              <Link
                href={navigationRoutes.PROFILE}
                locale={locale}
                onClick={toggleNavigation}
              >
                {t("Navigation.profil")}
              </Link>
            </li>
          )}
          {authBtn}
        </ul>
        <CTAButton
          title={t("Navigation.shop")}
          toPath={navigationRoutes.SHOP + `/${local}`}
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
