"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/navigation/Navbar";

import { Pet } from "@/types/Pet";
import Cat from "@/components/loader/Cat";
import { fetchPet } from "@/api/get/fetchPet";
import { navigationRoutes } from "@/enums/navigationRoutes";
import ScannedPetDetail from "./ScannedPetDetail";

const ScannedPetProfile: React.FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const petId = searchParams.get("petId") || "0";

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const petData = await fetchPet(Number(petId));
        setPet(petData);
      } catch (error) {
        console.error("Error fetching pet data", error);
        router.push(navigationRoutes.HOME);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [petId, router]);

  if (loading || !pet) {
    return <Cat />;
  }

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <ScannedPetDetail />
    </>
  );
};

export default ScannedPetProfile;
