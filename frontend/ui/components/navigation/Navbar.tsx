"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CTAButton from "../cta/CTAButton";

import logoImg from "../../public/assets/logo.png";

import styles from "./Navbar.module.css";

import { useLocale, useTranslations } from "next-intl";
import LanguagePicker from "../language/LanguagePicker";

import { navigationRoutes } from "../../enums/navigationRoutes";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Cat from "../loader/Cat";
import { isActivePath } from "@/util/isActivePath";

type NabarProps = {
  style?: { [key: string]: string };
};

const Navbar = ({ style }: NabarProps) => {
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

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

  const local = locale === "hu" || locale === "de" ? locale : ""; //shop defaults to english without locale

  const authBtn = isLoggedIn ? (
    <li>
      <Link
        href={navigationRoutes.LOGOUT}
        locale={locale}
        className={
          isActivePath(navigationRoutes.LOGOUT, currentPath)
            ? styles.active
            : ""
        }
      >
        {t("Navigation.logout")}
      </Link>
    </li>
  ) : (
    <li>
      <Link
        href={navigationRoutes.AUTH}
        locale={locale}
        className={
          isActivePath(navigationRoutes.AUTH, currentPath) ? styles.active : ""
        }
        onClick={() => renderLoadingScreen()}
      >
        {t("Navigation.login")}
      </Link>
    </li>
  );

  const renderLoadingScreen = () => {
    setShowLoadingScreen(true);
  };

  if (showLoadingScreen && !isActivePath(navigationRoutes.AUTH, currentPath)) {
    return <Cat />;
  }

  return (
    <nav
      className={`${styles.navBar} ${scrolled ? styles.scrolled : ""}`}
      style={style}
    >
      <Link href={""} locale={locale}>
        <Image
          src={logoImg}
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <ul>
        {isLoggedIn && (
          <li>
            <Link
              href={navigationRoutes.PROFILE}
              locale={locale}
              className={
                isActivePath(navigationRoutes.PROFILE, currentPath)
                  ? styles.active
                  : ""
              }
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
      />
      <LanguagePicker isScrolled={scrolled} className={styles.langPick} />
    </nav>
  );
};

export default Navbar;
