import { apiMethod } from "@/enums/apiMethod";
import React from "react";

import styles from "./ForgotPassword.module.css";
import { useTranslations } from "next-intl";

interface Props {
  setShowForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword = ({ setShowForgotPasswordModal }: Props) => {
  const t = useTranslations();

  const submitForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowForgotPasswordModal(false);
  };

  return (
    <>
      <div
        className={styles.forgot_modal}
        onClick={() => setShowForgotPasswordModal(false)}
      />
      <form
        onSubmit={submitForgotPassword}
        method={apiMethod.POST}
        className={styles.forgot_form}
      >
        <p>
          Provide your email below and we will send you a password reset link to
          securely reset your password!
        </p>
        <button
          onClick={() => setShowForgotPasswordModal(false)}
          className={styles.close}
        >
          X
        </button>
        <input
          name="email"
          type="email"
          placeholder={t("Auth.field.email")}
          required
        />
        <button type="submit" className={styles.submitBtn}>
          Reset password
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
