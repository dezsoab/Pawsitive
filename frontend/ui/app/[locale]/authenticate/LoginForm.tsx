"use client";

import React from "react";
import { loginOwner } from "@/api/post/loginOwner";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";

import styles from "./LoginForm.module.css";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function LoginForm() {
  const { setIsLoggedIn } = useAuth();
  const t = useTranslations();

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
      <form
        onSubmit={loginSubmitHandler}
        className={`${styles.form} ${styles.animateForm}`}
      >
        <label htmlFor="email">{t("Auth.field.email")}</label>
        <input
          name="email"
          type="email"
          placeholder={t("Auth.field.email")}
          required
        />
        <label htmlFor="password">{t("Auth.field.password")}</label>
        <input
          name="password"
          type="password"
          placeholder={t("Auth.field.password")}
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
        <button type="submit">Login</button>
      </form>
    </>
  );
}
