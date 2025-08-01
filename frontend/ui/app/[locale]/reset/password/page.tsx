"use client";
import Image from "next/image";
import React from "react";

import styles from "./Reset.module.css";

import side_dog from "../../../../public/assets/side_dog.png";
import Footer from "@/components/footer/Footer";
import { useLocale, useTranslations } from "next-intl";
import { isPasswordTheSame } from "@/util/validation";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "@/components/navigation/Navbar";
import { useSearchParams } from "next/navigation";
import { queryParams } from "@/enums/queryParams";
import { ResetPasswordDTO } from "@/types/ResetPasswordDTO";
import { resetPassword } from "@/api/post/resetPassword";

const ResetPassword = () => {
  const locale = useLocale();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get(queryParams.TOKEN) || "";

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

  const resetPasswordSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const { email, password1, password2 } = form.elements as any;

    if (!validatePassword(password1, password2)) return;

    const passwordResetData: ResetPasswordDTO = {
      email: email.value,
      password: password1.value,
      preferredLanguage: locale,
      token: token,
    };

    try {
      await toast.promise(
        resetPassword(passwordResetData),
        {
          pending: t("PasswordReset.notification.pending"),
          success: t("PasswordReset.notification.success"),
          error: {
            render({ data }: { data: Error }) {
              return data.message || t("PasswordReset.notification.error");
            },
          },
        },
        { position: "bottom-right" }
      );

      form.reset();
    } catch (e) {
      console.error("Password reset error:", e);
    }
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <main className={styles.reset}>
        <h1>{t("PasswordReset.title")}</h1>
        <Image alt="Cool dog under a blanket" src={side_dog} />
        <div className={styles.form_wrap}>
          <p>{t("PasswordReset.info")}</p>
          <form onSubmit={resetPasswordSubmitHandler}>
            <div>
              <label htmlFor="email">{t("Auth.field.email")}:</label>
              <input
                name="email"
                type="email"
                placeholder={t("Auth.field.email")}
                required
              />
            </div>
            <div>
              <label htmlFor="password1">{t("Auth.field.password")}:</label>
              <input
                name="password1"
                type="password"
                placeholder={t("Auth.field.password")}
                required
              />
            </div>
            <div>
              <label htmlFor="password2">{t("Auth.field.password2")}:</label>
              <input
                name="password2"
                type="password"
                placeholder={t("Auth.field.password2")}
                required
              />
            </div>
            <button type="submit">{t("Auth.btn.reset")}</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResetPassword;
