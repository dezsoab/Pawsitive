"use client";

import React, { useState, useEffect } from "react";

import styles from "./ScannedPetDetail.module.css";
import Image from "next/image";
import PawIcon from "@/components/pawIcon/PawIcon";
import { useTranslations } from "next-intl";
import PhoneIcon from "@/components/phoneIcon/PhoneIcon";
import EmailIcon from "../home/(contact-form)/EmailIcon";
import { fetchPetInformationDTO } from "@/api/get/fetchPetInformationDTO";
import { PetInformationDTO } from "@/types/PetInformationDTO";
import { useSearchParams } from "next/navigation";
import { queryParams } from "@/enums/queryParams";
import Cat from "@/components/loader/Cat";

import missingImage from "../../../public/assets/missing-image2.svg";
import DogHouseIcon from "@/components/dogHouseIcon/DogHouseIcon";
import { getTranslatedSex } from "@/util/translationHelper";

import confetti from "canvas-confetti";

const ScannedPetDetail = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const petId = searchParams.get(queryParams.PETID);

  const [petInformation, setPetInformation] = useState<PetInformationDTO>();

  useEffect(() => {
    const fetchPetInfo = async () => {
      if (petId == null) return;
      const data = await fetchPetInformationDTO(Number(petId));
      console.log(data);
      setPetInformation(data);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    };
    fetchPetInfo();
  }, []);

  if (petInformation === null) {
    return <Cat />;
  }

  return (
    <div className={styles.petDetailWrapper}>
      <div className={styles.petDetail}>
        <div className={styles.petImageWrapper}>
          <Image
            alt="Photo of the found pet"
            src={petInformation?.petDTO.photoUrl || missingImage}
            width={100}
            height={100}
            layout="responsive"
          />
        </div>
        <div className={styles.petInfoWrapper}>
          <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <div className={styles.petHeader}>
            <h1>{petInformation?.petDTO?.name}</h1>
            <p>{petInformation?.petDTO.breed || "-"}</p>
            <span>
              {t("ScannedPetDetail.thankYouMessage", {
                petName: petInformation?.petDTO.name,
              })}
            </span>
          </div>
          <div className={styles.petInfos}>
            <div>
              <p>{getTranslatedSex(t, petInformation?.petDTO.sex)}</p>
              <span>{t("Pet.sex.name")}</span>
              <PawIcon />
            </div>
            <div>
              <p>{petInformation?.petDTO.age || "-"}</p>
              <span>{t("Pet.age")}</span>
              <PawIcon />
            </div>
            <div>
              <p>
                {petInformation?.ownerDTO.isAddressVisible
                  ? petInformation.ownerDTO?.address?.city
                  : "-"}
              </p>
              <span>{t("ScannedPetDetail.city")}</span>
              <PawIcon />
            </div>
          </div>
          <div className={styles.petAddress}>
            <DogHouseIcon />
            <p>
              {petInformation?.ownerDTO.isAddressVisible
                ? `${petInformation.ownerDTO?.address?.country}, ${petInformation.ownerDTO?.address?.city} ${petInformation.ownerDTO?.address?.zipCode}, 
            ${petInformation.ownerDTO?.address?.street}`
                : "-"}
            </p>
          </div>
          <div className={styles.petContact}>
            <div className={styles.petContactPicture}>
              <p>
                {petInformation?.ownerDTO.firstName.charAt(0).toUpperCase()}
              </p>
            </div>
            <div className={styles.petContactPersonal}>
              <p>{petInformation?.ownerDTO.firstName}</p>
              <p>{petInformation?.ownerDTO.phone}</p>
            </div>
            <div className={styles.petContactCTA}>
              <a href={`tel:${petInformation?.ownerDTO.phone}`}>
                <PhoneIcon />
              </a>
              <a href={`mailto:${petInformation?.email}`}>
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannedPetDetail;
