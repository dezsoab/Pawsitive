"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import styles from "./ScannedPetProfile.module.css";

import Navbar from "@/components/navigation/Navbar";
import molli from "../../../public/assets/molli2.webp";
import Ribbon from "@/components/ribbon/Ribbon";
import ScannedPetDetails from "./ScannedPetDetails";
import { fetchPet } from "@/api/fetchPet";
import { Pet } from "@/types/Pet";
import Cat from "@/components/loader/Cat";

const ScannedPetProfile = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petData = await fetchPet(Number(id));
        setPet(petData);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchData();
  }, []);

  if (!pet) {
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
                src={pet.photoUrl || molli}
                alt={pet.name}
                fill
                // objectFit="contain"
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
