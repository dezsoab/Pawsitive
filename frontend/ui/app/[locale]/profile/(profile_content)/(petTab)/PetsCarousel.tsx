import React, { Dispatch, SetStateAction } from "react";

import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import PetCards from "./PetCards";
import { useTranslations } from "next-intl";

import styles from "./PetsCarousel.module.css";

interface PetsCarouselProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const PetsCarousel = ({ profile, setProfile }: PetsCarouselProps) => {
  const t = useTranslations("Dashboard");
  return (
    <div>
      <h1 className={styles.title}>{t("myPets")}</h1>
      <PetCards profile={profile} setProfile={setProfile} />
    </div>
  );
};

export default PetsCarousel;
