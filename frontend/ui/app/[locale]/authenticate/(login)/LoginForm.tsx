import React, { useRef } from "react";

import styles from "./LoginForm.module.css";
import Button from "@/components/button/Button";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";
import { loginOwner } from "@/api/post/loginOwner";
import { toast } from "react-toastify";
import { apiFetch } from "@/api/get/apiFetch";

const btnStyle = {
  padding: "1rem 1.5rem",
  backgroundColor: "var(--color-pink-light)",
};

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const loginOwnerObject: LoginOwnerDTO = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    toast
      .promise(
        loginOwner(loginOwnerObject),
        {
          pending: "Creating user account",
          success: "Successful registration!",
          error: "Something went wrong...",
        },
        {
          position: "bottom-right",
        }
      )
      .then(() => {
        // setEmailHasError(false);
        // formRef.current?.reset();

        // test to fetch protected route after auth
        apiFetch("auth/test");
      })
      .catch((e) => {
        const message: string = e.message;
        if (message.includes("email")) {
          // setEmailHasError(true);
        }
      });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleLogin}>
        <div className={styles.form}>
          <input
            type="email"
            id="email"
            className={styles.form__input}
            placeholder=" "
            ref={emailRef}
            required
          />
          <label htmlFor="email" className={styles.form__label}>
            Email:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="password"
            id="password"
            className={styles.form__input}
            placeholder=" "
            ref={passwordRef}
            required
          />
          <label htmlFor="password" className={styles.form__label}>
            Password:
          </label>
        </div>
        <Button text="Register" style={btnStyle} />
      </form>
    </div>
  );
};

export default LoginForm;
