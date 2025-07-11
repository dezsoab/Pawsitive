"use client";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, FormEvent, SetStateAction, useRef } from "react";

import styles from "../(userTab)/UserTab.module.css";
import { updateUserInformation } from "@/api/put/updateUserInformation";
import { toast } from "react-toastify";
import { isInvalidPhoneNumber } from "@/util/validation";
import { useTranslations } from "next-intl";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const IsEditingUserInformation = ({
  profile,
  setProfile,
  setIsEditing,
}: UserInformationProps) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const t = useTranslations();

  const validatePhoneNumber = (phone: string): boolean => {
    if (isInvalidPhoneNumber(phone.trim())) {
      toast.error(t("Auth.notification.phoneValidationFail"), {
        position: "bottom-right",
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneRef.current?.value || "")) {
      return;
    }

    const updatedProfile = {
      ...profile,
      email: profile.email,
      owner: {
        ...profile.owner,
        firstName: firstNameRef.current?.value || "",
        lastName: lastNameRef.current?.value || "",
        phone: phoneRef.current?.value.trim() || "",
        address: {
          ...profile.owner.address,
          country: countryRef.current?.value || null,
          zipCode: zipRef.current?.value || null,
          city: cityRef.current?.value || null,
          street: streetRef.current?.value || null,
        },
        isAddressVisible: consentRef.current?.checked || false,
      },
    };

    toast
      .promise(
        updateUserInformation(updatedProfile),
        {
          pending: t("Dashboard.personal.pending"),
          success: t("Dashboard.personal.success"),
          error: t("Dashboard.personal.error"),
        },
        {
          position: "bottom-right",
        }
      )
      .then(() => {
        setProfile(updatedProfile);
        setIsEditing(false);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">{t("Dashboard.personal.email")}</label>
        <input disabled id="email" name="email" value={profile.email} />
        <label htmlFor="firstName">{t("Dashboard.personal.firstName")}*</label>
        <input
          required
          ref={firstNameRef}
          id="firstName"
          name="firstName"
          defaultValue={profile.owner.firstName}
        />
        <label htmlFor="lastName">{t("Dashboard.personal.lastName")}*</label>
        <input
          required
          ref={lastNameRef}
          id="lastName"
          name="lastName"
          defaultValue={profile.owner.lastName}
        />
        <label htmlFor="phone">{t("Dashboard.personal.phone")}*</label>
        <input
          required
          ref={phoneRef}
          id="phone"
          name="phone"
          defaultValue={profile.owner.phone}
        />
        <label htmlFor="country">{t("Dashboard.personal.country")}</label>
        <input
          ref={countryRef}
          id="country"
          name="country"
          defaultValue={profile.owner?.address?.country || ""}
        />
        <label htmlFor="zip">{t("Dashboard.personal.zip")}</label>
        <input
          ref={zipRef}
          id="zip"
          name="zip"
          defaultValue={profile.owner?.address?.zipCode || ""}
        />
        <label htmlFor="city">{t("Dashboard.personal.city")}</label>
        <input
          ref={cityRef}
          id="city"
          name="city"
          defaultValue={profile.owner?.address?.city || ""}
        />
        <label htmlFor="street">{t("Dashboard.personal.street")}</label>
        <input
          ref={streetRef}
          id="street"
          name="street"
          defaultValue={profile.owner?.address?.street || ""}
        />
        <label className={styles.consent}>
          <input
            ref={consentRef}
            type="checkbox"
            defaultChecked={profile.owner.isAddressVisible}
          />
          <p>{t("Dashboard.personal.addressVisible")}</p>
        </label>
        <button type="submit" className={styles.save_edit}>
          {t("Dashboard.save")}
        </button>
      </form>
    </>
  );
};

export default IsEditingUserInformation;
