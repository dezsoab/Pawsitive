"use client";

import React, { SetStateAction, useState } from "react";
import { loginOwner } from "@/api/post/loginOwner";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";

import styles from "./LoginForm.module.css";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import ForgotPassword from "./ForgotPassword";

interface Props {
  setSwitchToRegisterForm: React.Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setSwitchToRegisterForm }: Props) {
  const { setIsLoggedIn } = useAuth();
  const t = useTranslations();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const { email, password, persistent } = form.elements as any;

    const loginData: LoginOwnerDTO = {
      email: email.value,
      password: password.value,
      persistLogin: persistent.checked,
    };

    try {
      await loginOwner(loginData);
      form.reset();
      setIsLoggedIn(true);
    } catch {
      toast.error(t("Auth.notification.loginFailed"), {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <div className={styles.login_wrapper}>
        <div className={styles.login}>
          <h1>{t("Auth.loginModal.welcome1")}</h1>
          <h2>{t("Auth.loginModal.welcome2")}</h2>
          <form
            onSubmit={loginSubmitHandler}
            className={`${styles.form} ${styles.animateForm}`}
          >
            <h3>{t("Auth.loginModal.whatToDo")}</h3>
            <p className={styles.info}>
              {t("Auth.loginModal.detailedWhatTodo")}
            </p>

            <label htmlFor="email">{t("Auth.field.email")}</label>
            <input
              autoComplete="email"
              type="email"
              id="email"
              placeholder={t("Auth.field.email")}
              required
            />

            <label htmlFor="password">{t("Auth.field.password")}</label>
            <input
              id="password"
              autoComplete="current-password"
              type="password"
              placeholder={t("Auth.field.password")}
              required
            />
            <div className={styles.persist}>
              <label htmlFor="persistent">{t("Auth.field.persistent")}</label>
              <input id="persistent" type="checkbox" defaultChecked />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
              </svg>
              {t("Auth.btn.login")}
            </button>
            <p
              onClick={() => setShowForgotPasswordModal(true)}
              className={styles.forgot_password}
            >
              {t("Auth.btn.forgot")}
            </p>
            <br />
            <hr />
            <br />
            <p className={styles.register}>
              {t("Auth.loginModal.notRegisteredYet")}
              <button
                type="button"
                onClick={() => setSwitchToRegisterForm(true)}
              >
                {t("Auth.btn.register")}
              </button>
            </p>
          </form>
          <p className={styles.proof}>{t("Auth.proof")}</p>
        </div>
      </div>
      {showForgotPasswordModal && (
        <ForgotPassword
          setShowForgotPasswordModal={setShowForgotPasswordModal}
        />
      )}
    </>
  );
}
