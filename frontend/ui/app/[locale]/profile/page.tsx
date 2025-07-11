"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkIfAuthenticated } from "@/api/get/checkIfAuthenticated";
import Cat from "@/components/loader/Cat";
import Profile from "./(profile_content)/Profile";
import { navigationRoutes } from "@/enums/navigationRoutes";
import Footer from "@/components/footer/Footer";

const PersonalPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allowOnlyAuthenticatedUsers = async () => {
      try {
        const isAuthenticated = await checkIfAuthenticated();
        if (!isAuthenticated) {
          router.push(navigationRoutes.AUTH);
          return;
        }
      } catch (error) {
        console.error("Error checking ownership:", error);
        router.push(navigationRoutes.AUTH);
      } finally {
        setLoading(false);
      }
    };

    allowOnlyAuthenticatedUsers();
  }, [router]);

  if (loading) {
    return <Cat />;
  }

  return (
    <>
      <main>
        <Profile />
      </main>
      <Footer />
    </>
  );
};

export default PersonalPage;
