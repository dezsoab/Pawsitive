import React from "react";

import styles from "./ScannedPetDetails.module.css";
import { useTranslations } from "next-intl";
import { Pet } from "@/types/Pet";

interface ScannedPetDetailsProps {
  pet: Pet;
}

const ScannedPetDetails = ({ pet }: ScannedPetDetailsProps) => {
  const t = useTranslations("ScannedPet");

  pet.sex == "Male" ? (pet.sex = t("sex.male")) : (pet.sex = t("sex.female"));

  return (
    <div className={styles.details}>
      <p>
        {t("breed")}: {pet.breed}
      </p>
      <p>
        {t("age")}: {pet.age}
      </p>
      <p>
        {t("sex.name")}: {pet.sex}
      </p>
      <p>{t("size")}: kozepes</p>
      <hr />
    </div>
  );
};

export default ScannedPetDetails;
