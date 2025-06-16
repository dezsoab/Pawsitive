"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import styles from "./ScannedPetProfile.module.css";

import Navbar from "@/components/navigation/Navbar";
import Ribbon from "@/components/ribbon/Ribbon";
import ScannedPetDetails from "./ScannedPetDetails";

import { Pet } from "@/types/Pet";
import Cat from "@/components/loader/Cat";
import { fetchPet } from "@/api/get/fetchPet";
import { navigationRoutes } from "@/enums/navigationRoutes";

const ScannedPetProfile: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const petId = searchParams.get("petId") || "0";
  const tagId = searchParams.get("tagId") || "0";

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
      <div className={styles.background}>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <Image
                src={
                  pet.photoUrl
                    ? `${pet.photoUrl}?t=${new Date().getTime()}`
                    : "/assets/missing-image.jpg"
                }
                alt={pet.name}
                fill
                objectFit="cover"
              />
            </div>
            <div className={styles.petDetails}>
              <div className={styles.petContent}>
                <Ribbon name={pet.name} />
                <ScannedPetDetails pet={pet} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ScannedPetProfile;
