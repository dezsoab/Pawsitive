import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import { useTranslations } from "next-intl";
import React from "react";

import styles from "./IsNotEditingUserInformation.module.css";

interface UserInformationProps {
  profile: ProfileInformationDTO;
}

const IsNotEditingUserInformation = ({ profile }: UserInformationProps) => {
  const t = useTranslations();
  return (
    <div className={styles.wrap}>
      <label htmlFor="email">{t("Dashboard.personal.email")}</label>
      <p>{profile.email}</p>

      <label htmlFor="firstName">{t("Dashboard.personal.firstName")}</label>
      <p>{profile.owner.firstName}</p>

      <label htmlFor="lastName">{t("Dashboard.personal.lastName")}</label>
      <p>{profile.owner.lastName}</p>

      <label htmlFor="phone">{t("Dashboard.personal.phone")}</label>
      <p>{profile.owner.phone}</p>

      <label htmlFor="phoneSecondary">
        {t("Dashboard.personal.secondaryPhone")}
      </label>
      <p>{profile.owner.secondaryPhone}</p>

      <label htmlFor="country">{t("Dashboard.personal.country")}</label>
      <p>{profile.owner?.address?.country}</p>

      <label htmlFor="zip">{t("Dashboard.personal.zip")}</label>
      <p>{profile.owner?.address?.zipCode}</p>

      <label htmlFor="city">{t("Dashboard.personal.city")}</label>
      <p>{profile.owner?.address?.city}</p>

      <label htmlFor="street">{t("Dashboard.personal.street")}</label>
      <p>{profile.owner?.address?.street}</p>

      <br />
      <p>
        {t("Dashboard.personal.addressConsentStatus", {
          status: profile.owner.isAddressVisible
            ? t("Dashboard.common.are")
            : t("Dashboard.common.areNot"),
        })}
      </p>
      <span>{t("Dashboard.personal.editHint")}</span>
    </div>
  );
};

export default IsNotEditingUserInformation;
