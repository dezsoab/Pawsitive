"use client";

import React from "react";
import { useRouter } from "next/navigation";

import styles from "./RegisterForm.module.css";
import { useAuth } from "@/context/AuthContext";
import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import { createOwner } from "@/api/post/createOwner";
import { navigationRoutes } from "@/enums/navigationRoutes";

export default function RegisterForm() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

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

    if (password1.value != password2.value) {
      alert("PW not the same!!");
      return;
    }

    const registerData: RegisterOwnerDTO = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password1.value,
      persistLogin: persistent.checked,
    };

    try {
      await createOwner(registerData);
      form.reset();
      router.push(navigationRoutes.PROFILE);
      setIsLoggedIn(true);
    } catch {
      alert("not OK register"); // TODO: write on the A1 screen
    }
  };

  return (
    <>
      <form
        onSubmit={registerSubmitHandler}
        className={`${styles.form} ${styles.animateForm}`}
      >
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" type="text" placeholder="First Name" required />
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" type="text" placeholder="Last Name" required />
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="Email" required />
        <label htmlFor="phone">Phone</label>
        <input name="phone" type="tel" placeholder="Phone" required />
        <label htmlFor="password1">Password</label>
        <input
          name="password1"
          type="password"
          placeholder="Password"
          required
        />
        <label htmlFor="password2">Password Again</label>
        <input
          name="password2"
          type="password"
          placeholder="Password again"
          required
        />

        <div>
          <label htmlFor="persistent">Remember me</label>
          <input
            id="persistent"
            name="persistent"
            type="checkbox"
            defaultChecked
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
