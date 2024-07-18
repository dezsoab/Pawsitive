import React from "react";
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

  return (
    <>
      <Hamburger />
      <nav className={styles.navBarMobile}>
        {/* <Link href={navigationRoutes.HOME} locale={locale}>
          <Image
            src="/assets/logo.png"
            width={100}
            height={100}
            alt="Pawsitivecollar logo"
          />
        </Link> */}
        <ul>
          <li>
            <Link href={navigationRoutes.HOME} locale={locale}>
              {t("Navigation.home")}
            </Link>
          </li>
          <li>
            <Link href={navigationRoutes.ABOUT} locale={locale}>
              {t("Navigation.about")}
            </Link>
          </li>
          <li>
            <Link href={navigationRoutes.CONTACT} locale={locale}>
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
        />
        <LanguagePicker isScrolled={false} />
      </nav>
    </>
  );
};

export default NavbarMobile;
