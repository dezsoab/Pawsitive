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
      <p>
        {t("address")}: {pet.owner.address.city}
      </p>
      <p>
        {t("tel")}: {pet.owner.phone}
      </p>
      <p>
        {t("email")}: {pet.owner.email}
      </p>
      <hr />
      <div>
        <h1>{t("lost")}</h1>
      </div>
    </div>
  );
};

export default ScannedPetDetails;
