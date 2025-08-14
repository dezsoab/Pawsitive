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
                <path d="M14.872 17.711c-.29.54-1.002.918-1.729.918-.447 0-.849-.147-1.15-.416-.301.269-.704.416-1.149.416-.729 0-1.44-.378-1.73-.918-.309-.576.536-1.14.94-.424.102.181.432.375.761.375.692 0 .631-.738.631-1.3-.423-.211-.717-.63-.717-1.006 0-.527.57-.762 1.271-.762s1.271.235 1.271.762c0 .38-.299.805-.73 1.014 0 .587-.056 1.254.599 1.254.341 0 .729-.208.863-.393.45-.624 1.185-.106.869.48zm.128-6.211c-.459 0-.833.374-.833.834 0 .459.374.833.833.833.459 0 .833-.374.833-.833 0-.46-.374-.834-.833-.834zm0 2.667c-1.011 0-1.833-.822-1.833-1.833 0-1.012.822-1.834 1.833-1.834 1.011 0 1.833.822 1.833 1.834 0 1.011-.822 1.833-1.833 1.833zm-6-2.667c-.46 0-.834.374-.834.834 0 .459.374.833.834.833.459 0 .833-.374.833-.833 0-.46-.374-.834-.833-.834zm0 2.667c-1.011 0-1.834-.822-1.834-1.833 0-1.012.823-1.834 1.834-1.834 1.011 0 1.833.822 1.833 1.834 0 1.011-.822 1.833-1.833 1.833zm12.113 3.986c-.78-7.61-2.462-11.289-4.568-13.869-1.21 1.055-2.044 1.769-3.321 3.667-.74-.121-1.769-.119-2.486.006-1.538-1.838-2.574-2.676-3.813-3.654-2.037 2.484-3.503 6.137-4.117 13.723-1.14-1.732-1.808-3.801-1.808-6.026 0-6.065 4.934-11 11-11 6.065 0 11 4.935 11 11 0 2.277-.696 4.396-1.887 6.153zm-9.113 4.847c-3.298 0-6.254-1.466-8.272-3.772.304-4.521 1.094-10.361 3.357-13.517 1.728 1.421 2.717 2.682 3.276 3.359.748-.19 1.823-.358 3.316.007.96-1.452 1.508-2.222 2.74-3.347 1.989 2.717 3.26 7.267 3.8 13.558-2.017 2.271-4.949 3.712-8.217 3.712zm0-23c-6.623 0-12 5.377-12 12 0 6.627 5.4 12 12 12 6.559 0 12-5.33 12-12 0-6.623-5.377-12-12-12z" />
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
