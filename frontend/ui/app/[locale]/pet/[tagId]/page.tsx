import Navbar from "@/components/navigation/Navbar";
import Image from "next/image";
import React from "react";

import styles from "./ScannedPetProfile.module.css";
import molli from "../../../../public/assets/cezar1.webp";
import Ribbon from "@/components/ribbon/Ribbon";
import ScannedPetDetails from "./ScannedPetDetails";

const ScannedPetProfile = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div className={styles.background}>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <Image
                src={molli}
                alt="NotFound.molli_image_alt"
                fill
                // objectFit="contain"
                objectFit="cover"
              />
            </div>
            <div className={styles.petDetails}>
              <div className={styles.petContent}>
                <Ribbon name="Molli" />
                <ScannedPetDetails />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ScannedPetProfile;