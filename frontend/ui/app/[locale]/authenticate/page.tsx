"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navigation/Navbar";

import LoginForm from "./LoginForm";

import Cat from "@/components/loader/Cat";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { navigationRoutes } from "@/enums/navigationRoutes";
import { queryParams } from "@/enums/queryParams";

import styles from "./AuthenticatePage.module.css";
import RegisterForm from "./RegisterForm";
import { ToastContainer } from "react-toastify";

export default function AuthenticatePage() {
  const searchParams = useSearchParams();
  const isFreshTag = Boolean(searchParams.get(queryParams.ISFRESHTAG));
  const tagId = searchParams.get(queryParams.TAGID);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(
        `${navigationRoutes.PROFILE}?${queryParams.TAGID}=${tagId}&${queryParams.ISFRESHTAG}=${isFreshTag}`
      );
    }
  }, [isLoggedIn, router]);

  const [switchToRegisterForm, setSwitchToRegisterForm] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [switchToRegisterForm]);

  return isLoggedIn ? (
    <Cat />
  ) : (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div>
        {switchToRegisterForm && (
          <RegisterForm setSwitchToRegisterForm={setSwitchToRegisterForm} />
        )}
        {!switchToRegisterForm && (
          <LoginForm setSwitchToRegisterForm={setSwitchToRegisterForm} />
        )}
        <div className={styles.video_wrapper}>
          <video muted autoPlay playsInline preload="none" loop>
            <source src="/assets/cover_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
