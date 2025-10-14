import { navigationRoutes } from "@/enums/navigationRoutes";
import { profileTabs } from "@/enums/profileTabs";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import styles from "./ProfileNavbar.module.css";
import Image from "next/image";
import LanguagePicker from "@/components/language/LanguagePicker";

import logo from "../../../../../public/assets/logo.png";

interface ProfileNavbarProps {
  activeTab: profileTabs;
  setActiveTab: Dispatch<SetStateAction<profileTabs>>;
}

const ProfileNavbar = ({ activeTab, setActiveTab }: ProfileNavbarProps) => {
  const locale = useLocale();
  const t = useTranslations("Navigation");

  return (
    <div className={styles.nav}>
      <Link href={""} locale={locale} className={styles.logoLink}>
        <Image src={logo} width={100} height={100} alt="Pawsitivecollar logo" />
      </Link>
      <button onClick={() => setActiveTab(profileTabs.PERSONAL)}>
        <Link
          href="#"
          locale={locale}
          className={`${
            activeTab === profileTabs.PERSONAL ? styles.active : ""
          }`}
        >
          {t("personal")}
        </Link>
      </button>
      <button onClick={() => setActiveTab(profileTabs.PETS)}>
        <Link
          href="#"
          locale={locale}
          className={`${activeTab === profileTabs.PETS ? styles.active : ""}`}
        >
          {t("pets")}
        </Link>
      </button>
      <button>
        <Link href={navigationRoutes.LOGOUT} locale={locale}>
          {t("logout")}
        </Link>
      </button>
      <LanguagePicker isScrolled={false} className={styles.language} />
    </div>
  );
};

export default ProfileNavbar;
