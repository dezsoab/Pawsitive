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
import { useAuth } from "@/context/AuthContext";
import Cat from "../loader/Cat";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/util/isActivePath";
import { useMobileNavbar } from "@/context/MobileNavbarContext";

const NavbarMobile = () => {
  const locale = useLocale();
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const { color } = useMobileNavbar();

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
    setShowLoadingScreen(false);
  };

  const renderLoadingScreen = () => {
    setShowLoadingScreen(true);
    ref.current?.classList.remove(styles.active);
    document.body.classList.remove(styles.noscroll);
  };

  // if not already on AUTH page -> render cat due to printer model takes long to load in
  // if (showLoadingScreen && !isActivePath(navigationRoutes.AUTH, currentPath)) {
  //   alert("rendering cat");
  //   return <Cat />;
  // }

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
      id="header"
      style={{ backgroundColor: color }}
    >
      <Link
        href={navigationRoutes.HOME}
        locale={locale}
        className={styles.logo}
        onClick={() => setShowLoadingScreen(false)}
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
