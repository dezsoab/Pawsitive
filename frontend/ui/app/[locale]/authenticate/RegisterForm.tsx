"use client";

import React from "react";

import styles from "./RegisterForm.module.css";
import { useAuth } from "@/context/AuthContext";
import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import { createOwner } from "@/api/post/createOwner";
import { useLocale, useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import { isInvalidPhoneNumber, isPasswordTheSame } from "@/util/validation";

export default function RegisterForm() {
  const { setIsLoggedIn } = useAuth();
  const locale = useLocale() || "en";
  const t = useTranslations();

  const validatePhoneNumber = (phone: HTMLFormElement): boolean => {
    if (isInvalidPhoneNumber(phone.value.trim())) {
      toast.error(t("Auth.field.phoneValidationFail"), {
        position: "bottom-right",
      });
      return false;
    }
    return true;
  };

  const validatePassword = (
    password1: HTMLFormElement,
    password2: HTMLFormElement
  ) => {
    if (isPasswordTheSame(password1, password2)) {
      toast(t("Auth.field.passwordMismatch"), { position: "bottom-right" });
      return;
    }
  };

  const registerSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const {
      email,
      password1,
      password2,
      firstName,
      lastName,
      phone,
      persistent,
    } = form.elements as any;

    validatePassword(password1, password2);
    if (!validatePhoneNumber(phone)) return;

    const registerData: RegisterOwnerDTO = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password1.value,
      persistLogin: persistent.checked,
      preferredLanguage: locale,
    };

    try {
      await toast.promise(
        createOwner(registerData),
        {
          pending: t("Auth.field.registerPending"),
          success: t("Auth.field.registerSuccess"),
          error: {
            render({ data }: { data: Error }) {
              return data.message || t("Auth.field.registerError");
            },
          },
        },
        { position: "bottom-right" }
      );

      form.reset();
      setIsLoggedIn(true);
    } catch (e) {
      console.error("Registration error:", e);
    }
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <form
        onSubmit={registerSubmitHandler}
        className={`${styles.form} ${styles.animateForm}`}
      >
        <label htmlFor="firstName">{t("Auth.field.firstName")}</label>
        <input
          name="firstName"
          type="text"
          placeholder={t("Auth.field.firstName")}
          required
        />
        <label htmlFor="lastName">{t("Auth.field.lastName")}</label>
        <input
          name="lastName"
          type="text"
          placeholder={t("Auth.field.lastName")}
          required
        />
        <label htmlFor="email">{t("Auth.field.email")}</label>
        <input
          name="email"
          type="email"
          placeholder={t("Auth.field.email")}
          required
        />
        <label htmlFor="phone">{t("Auth.field.phone")}</label>
        <input
          name="phone"
          type="tel"
          placeholder={t("Auth.field.phone")}
          required
        />
        <label htmlFor="password1">{t("Auth.field.password")}</label>
        <input
          name="password1"
          type="password"
          placeholder={t("Auth.field.password")}
          required
        />
        <label htmlFor="password2">{t("Auth.field.password2")}</label>
        <input
          name="password2"
          type="password"
          placeholder={t("Auth.field.password2")}
          required
        />

        <div>
          <label htmlFor="persistent">{t("Auth.field.persistent")}</label>
          <input
            id="persistent"
            name="persistent"
            type="checkbox"
            defaultChecked
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
