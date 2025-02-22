import React, { useRef } from "react";

import styles from "./LoginForm.module.css";
import Button from "@/components/button/Button";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";
import { loginOwner } from "@/api/post/loginOwner";
import { toast, ToastContainer } from "react-toastify";

const btnStyle = {
  padding: "1rem 1.5rem",
  backgroundColor: "var(--color-pink-light)",
};

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
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
          pending: "Logging in...",
          success: "Successful login!",
          error: "Something went wrong...",
        },
        {
          position: "bottom-right",
        }
      )
      .then(() => {
        formRef.current?.reset();
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
      <form onSubmit={handleLogin} ref={formRef}>
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
        <Button text="Login" style={btnStyle} />
      </form>
    </div>
  );
};

export default LoginForm;
