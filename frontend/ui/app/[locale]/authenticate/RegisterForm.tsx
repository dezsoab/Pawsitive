"use client";

import React, { SetStateAction } from "react";

import styles from "./RegisterForm.module.css";
import { useAuth } from "@/context/AuthContext";
import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import { createOwner } from "@/api/post/createOwner";
import { useLocale, useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import { isInvalidPhoneNumber, isPasswordTheSame } from "@/util/validation";

interface Props {
  setSwitchToRegisterForm: React.Dispatch<SetStateAction<boolean>>;
}

export default function RegisterForm({ setSwitchToRegisterForm }: Props) {
  const { setIsLoggedIn } = useAuth();
  const locale = useLocale() || "en";
  const t = useTranslations();

  const validatePhoneNumber = (phone: HTMLFormElement): boolean => {
    if (isInvalidPhoneNumber(phone.value.trim())) {
      toast.error(t("Auth.notification.phoneValidationFail"), {
        position: "bottom-right",
      });
      return false;
    }
    return true;
  };

  const validatePassword = (
    password1: HTMLFormElement,
    password2: HTMLFormElement
  ): boolean => {
    if (!isPasswordTheSame(password1, password2)) {
      toast.error(t("Auth.notification.passwordMismatch"), {
        position: "bottom-right",
      });
      return false;
    }
    return true;
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

    if (!validatePassword(password1, password2)) return;
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
          pending: t("Auth.notification.registerPending"),
          success: t("Auth.notification.registerSuccess"),
          error: {
            render({ data }: { data: Error }) {
              return data.message || t("Auth.notification.registerError");
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
      <div className={styles.register_wrapper}>
        <div className={styles.register}>
          <h1>{t("Auth.registerModal.welcome1")}</h1>
          <h2>{t("Auth.registerModal.welcome2")}</h2>
          <form
            onSubmit={registerSubmitHandler}
            className={`${styles.form} ${styles.animateForm}`}
          >
            <h3>{t("Auth.registerModal.whatToDo")}</h3>
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

            <div className={styles.persist}>
              <label htmlFor="persistent">{t("Auth.field.persistent")}</label>
              <input
                id="persistent"
                name="persistent"
                type="checkbox"
                defaultChecked
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M6.623 18.244l-2.285.728c-.63.194-.936-.751-.303-.954l2.284-.727c.635-.198.931.753.304.953zm-.291-1.718l-3.47-1c-.641-.183-.352-1.15.277-.961l3.471 1c.642.185.351 1.147-.278.961zm13.331 2.446l-2.285-.728c-.63-.201-.329-1.15.303-.953l2.284.727c.633.203.326 1.151-.302.954zm1.476-3.446l-3.471 1c-.632.185-.915-.777-.277-.961l3.471-1c.635-.185.913.779.277.961zm-4.639-3.526c-.551 0-1-.448-1-1s.449-1 1-1c.552 0 1 .448 1 1s-.448 1-1 1zm2-1c0-1.105-.896-2-2-2-1.103 0-2 .895-2 2 0 1.104.897 2 2 2 1.104 0 2-.896 2-2zm-11 1c-.551 0-1-.448-1-1s.449-1 1-1c.552 0 1 .448 1 1s-.448 1-1 1zm2-1c0-1.105-.896-2-2-2s-2 .895-2 2c0 1.104.896 2 2 2s2-.896 2-2zm5.956 7.35c-.547 1.215-2.47 1.831-3.456.543-.987 1.289-2.91.671-3.456-.543-.271-.6.64-1.014.912-.41.336.746 2.034 1.301 2.044-.797v-.504c-.615-.218-1.061-.798-1.061-1.313 0-.646.699-.936 1.561-.936.863 0 1.562.29 1.562.936 0 .515-.446 1.095-1.062 1.313v.504c.009 2.12 1.713 1.533 2.044.797.271-.602 1.184-.192.912.41zm-3.456 4.65c-7.093 0-11-3.351-11-9.435 0-3.774 1.563-8.027 4.419-12.072 1.746 1.658 2.505 2.723 3.958 4.91 2.418-.609 3.786-.361 5.251-.004 1.431-2.167 2.219-3.304 3.944-4.914 2.825 4.032 4.428 8.385 4.428 12.08 0 6.084-3.906 9.435-11 9.435zm6.728-23c-2.082 1.814-3.081 3.044-4.546 5.261-1.289-.316-3.281-.274-4.363 0-1.402-2.11-2.405-3.344-4.546-5.261-3.069 4.042-5.273 8.939-5.273 13.565 0 5.759 3.397 10.435 12 10.435 8.604 0 12-4.676 12-10.435 0-4.578-2.207-9.502-5.272-13.565z" />
              </svg>
              Register
            </button>

            <p className={styles.login}>
              {t("Auth.registerModal.loginInstead")}
              <button
                type="button"
                onClick={() => setSwitchToRegisterForm(false)}
              >
                {t("Auth.btn.login")}
              </button>
            </p>
          </form>
          <p className={styles.proof}>{t("Auth.proof")}</p>
        </div>
      </div>
    </>
  );
}
