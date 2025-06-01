"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loginOwner } from "@/api/post/loginOwner";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("tagId");
  const router = useRouter();

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
      router.push(id ? `/profile?tagId=${id}` : "/profile");
    } catch {
      alert("not OK login"); // TODO: write on the A1 screen
    }
  };

  return (
    <form
      onSubmit={loginSubmitHandler}
      className={`${styles.form} ${styles.animateForm}`}
    >
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <div>
        <label htmlFor="persistent">Remember me</label>
        <input
          id="persistent"
          name="persistent"
          type="checkbox"
          defaultChecked
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
