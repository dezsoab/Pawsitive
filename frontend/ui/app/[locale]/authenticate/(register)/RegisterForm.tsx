"use client";
import { createOwner } from "@/api/post/createOwner";
import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import React, { useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./RegisterForm.module.css";
import Button from "@/components/button/Button";

const btnStyle = {
  padding: "1rem 1.5rem",
  backgroundColor: "var(--color-pink-light)",
};

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const [emailHasError, setEmailHasError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const owner: RegisterOwnerDTO = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      phone: telRef.current!.value,
      country: countryRef.current!.value,
      city: cityRef.current!.value,
      zipCode: zipRef.current!.value,
      street: streetRef.current!.value,
    };

    toast
      .promise(
        createOwner(owner),
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
        setEmailHasError(false);
        formRef.current?.reset();
      })
      .catch((e) => {
        const message: string = e.message;
        if (message.includes("email")) {
          setEmailHasError(true);
        }
      });
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.form}>
          <input
            type="text"
            id="firstName"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={firstNameRef}
            required
          />
          <label htmlFor="firstName" className={styles.form__label}>
            First name:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            id="lastName"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={lastNameRef}
            required
          />
          <label htmlFor="lastName" className={styles.form__label}>
            Last name:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="email"
            id="email"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={emailRef}
            required
          />
          <label htmlFor="email" className={styles.form__label}>
            Email:
          </label>
        </div>
        {emailHasError && "email is already in use"}

        <div className={styles.form}>
          <input
            type="tel"
            id="tel"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={telRef}
            required
          />
          <label htmlFor="tel" className={styles.form__label}>
            Phone:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            id="country"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={countryRef}
            required
          />
          <label htmlFor="country" className={styles.form__label}>
            Country:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            id="city"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={cityRef}
            required
          />
          <label htmlFor="city" className={styles.form__label}>
            City:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            id="zip"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={zipRef}
            required
          />
          <label htmlFor="zip" className={styles.form__label}>
            Zip:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            id="street"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={streetRef}
            required
          />
          <label htmlFor="street" className={styles.form__label}>
            Street:
          </label>
        </div>

        <div className={styles.form}>
          <input
            type="password"
            id="password"
            className={styles.form__input}
            autoComplete="off"
            placeholder=" "
            ref={passwordRef}
            required
          />
          <label htmlFor="password" className={styles.form__label}>
            Password:
          </label>
        </div>

        <Button text="Register" onClick={() => handleSubmit} style={btnStyle} />
      </form>
    </div>
  );
};

export default RegisterForm;
