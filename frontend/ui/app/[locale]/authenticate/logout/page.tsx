"use client";
import { logoutUser } from "@/api/delete/logoutUser";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { navigationRoutes } from "@/enums/navigationRoutes";

const Logout = () => {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await toast.promise(
          logoutUser(),
          {
            pending: "Logging out...",
            success: "Successfully logged out!",
            error: "Error during logout", // Optional
          },
          { position: "bottom-right" }
        );
      } catch (e) {
        console.error("Logout error:", e);
      } finally {
        setIsLoggedIn(false);
        router.push(navigationRoutes.AUTH);
      }
    };

    performLogout();
  }, []);

  return (
    <div>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      Logging out.....
    </div>
  );
};

export default Logout;
