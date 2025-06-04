"use client";
import { logoutUser } from "@/api/delete/logoutUser";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
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
            },
            { position: "bottom-right" }
          )
          .then(() => {
            setIsLoggedIn(false);
          })
          .then(() => router.push("/home")); // Redirect immediately after logout
      } catch (e) {
        console.error("Logout error:", e);
      }
    };

    performLogout();
  });

  return (
    <div>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      Logging out.....
    </div>
  );
};

export default Logout;
