import { navigationRoutes } from "@/enums/navigationRoutes";
import { profileTabs } from "@/enums/profileTabs";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import styles from "./ProfileNavbar.module.css";
import Image from "next/image";

interface ProfileNavbarProps {
  activeTab: profileTabs;
  setActiveTab: Dispatch<SetStateAction<profileTabs>>;
}

const ProfileNavbar = ({ activeTab, setActiveTab }: ProfileNavbarProps) => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className={styles.nav}>
      <Link
        href={navigationRoutes.HOME}
        locale={locale}
        className={styles.logoLink}
      >
        <Image
          src="/assets/logo.png"
          width={100}
          height={100}
          alt="Pawsitivecollar logo"
        />
      </Link>
      <button>
        <Link href={navigationRoutes.HOME} locale={locale}>
          {t("Navigation.home")}
        </Link>
      </button>
      <button onClick={() => setActiveTab(profileTabs.PERSONAL)}>
        <Link
          href="#"
          locale={locale}
          className={`${
            activeTab === profileTabs.PERSONAL ? styles.active : ""
          }`}
        >
          {profileTabs.PERSONAL}
        </Link>
      </button>
      <button onClick={() => setActiveTab(profileTabs.PETS)}>
        <Link
          href="#"
          locale={locale}
          className={`${activeTab === profileTabs.PETS ? styles.active : ""}`}
        >
          {profileTabs.PETS}
        </Link>
      </button>
      <button>
        <Link href={navigationRoutes.LOGOUT} locale={locale}>
          {t("Navigation.logout")}
        </Link>
      </button>
    </div>
  );
};

export default ProfileNavbar;
