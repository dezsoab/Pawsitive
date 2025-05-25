"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkIfAuthenticated } from "@/api/get/checkIfAuthenticated";
import Cat from "@/components/loader/Cat";
import Profile from "./[profile_content]/Profile";

const PersonalPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagId = searchParams.get("tagId") || "";
  const petId = searchParams.get("petId") || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allowOnlyAuthenticatedUsers = async () => {
      try {
        const isAuthenticated = await checkIfAuthenticated();
        if (!isAuthenticated) {
          router.push(`/authenticate/login?tagId=${tagId}`);
          return;
        }
      } catch (error) {
        console.error("Error checking ownership:", error);
        // TODO: Handle error, potentially redirect to login
      } finally {
        setLoading(false);
      }
    };

    allowOnlyAuthenticatedUsers();
  }, [petId, tagId, router]);

  if (loading) {
    return <Cat />;
  }

  return (
    <main>
      <Profile />
    </main>
  );
};

export default PersonalPage;
