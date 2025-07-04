"use client";

import React from "react";

import styles from "./RegisterForm.module.css";
import { useAuth } from "@/context/AuthContext";
import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import { createOwner } from "@/api/post/createOwner";
import { useLocale, useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterForm() {
  const { setIsLoggedIn } = useAuth();
  const locale = useLocale() || "en";
  const t = useTranslations();

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

    if (password1.value != password2.value) {
      alert("PW not the same!!");
      return;
    }

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
          pending: "Registering account...",
          success: "Successful registration! 🎉",
          error: {
            render({ data }: { data: Error }) {
              return data.message || "Something went wrong!";
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
