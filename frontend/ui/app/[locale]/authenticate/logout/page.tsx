"use client";
import { logoutUser } from "@/api/delete/logoutUser";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await toast
          .promise(
            logoutUser(),
            {
              pending: "Logging out...",
              success: "Successfully logged out!",
              error: "Logout failed. Please try again.",
            },
            { position: "bottom-right" }
          )
          .then(() => {
            setIsLoggedIn(false);
            router.replace("/home"); // Redirect immediately after logout
          })
          .then(() => console.log("logout triggered"));
      } catch (e) {
        console.error("Logout error:", e);
      }
    };

    performLogout();
  }, []);

  return <div>Logging out.....</div>;
};

export default Logout;
