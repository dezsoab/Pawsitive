import { apiMethod } from "@/enums/apiMethod";
import React, { useRef } from "react";

import styles from "./ForgotPassword.module.css";
import { useLocale, useTranslations } from "next-intl";
import { sendEmailAddress } from "@/api/post/sendEmailAddress";
import { ForgotPasswordRequestDTO } from "@/types/ForgotPasswordRequestDTO";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  setShowForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword = ({ setShowForgotPasswordModal }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const locale = useLocale();

  const submitForgotPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const requestDto: ForgotPasswordRequestDTO = {
      email: emailRef.current!.value,
      language: locale,
    };

    await toast.promise(
      sendEmailAddress(requestDto),
      {
        pending: t("Auth.notification.forgot_pw_pending"),
        success: t("Auth.notification.forgot_pw_success"),
        error: t("Auth.notification.forgot_pw_error"),
      },
      { position: "bottom-right", toastId: "reset_pw" }
    );

    setShowForgotPasswordModal(false);
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <div
        className={styles.forgot_modal}
        onClick={() => setShowForgotPasswordModal(false)}
      />
      <form
        onSubmit={submitForgotPassword}
        method={apiMethod.POST}
        className={styles.forgot_form}
      >
        <p>{t("Auth.pwdModal")}</p>
        <button
          onClick={() => setShowForgotPasswordModal(false)}
          className={styles.close}
        >
          X
        </button>
        <input
          ref={emailRef}
          name="email"
          type="email"
          placeholder={t("Auth.field.email")}
          required
        />
        <button type="submit" className={styles.submitBtn}>
          {t("Auth.btn.reset")}
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
