"use client";

import React, { useState, useEffect } from "react";

import styles from "./ScannedPetDetail.module.css";
import Image from "next/image";
import PawIcon from "@/components/pawIcon/PawIcon";
import { useLocale, useTranslations } from "next-intl";
import PhoneIcon from "@/components/phoneIcon/PhoneIcon";

import { fetchPetInformationDTO } from "@/api/get/fetchPetInformationDTO";
import { PetInformationDTO } from "@/types/PetInformationDTO";
import { useSearchParams } from "next/navigation";
import { queryParams } from "@/enums/queryParams";
import Cat from "@/components/loader/Cat";

import missingImage from "../../../public/assets/missing-image2.svg";
import DogHouseIcon from "@/components/dogHouseIcon/DogHouseIcon";
import { getTranslatedSex } from "@/util/translationHelper";

import confetti from "canvas-confetti";
import { saveScannedLocation } from "@/api/post/saveScannedLocation";
import { ScannedLocationDTO } from "@/types/ScannedLocationDTO";
import { toast, ToastContainer } from "react-toastify";
import EmailIcon from "@/components/emailIcon/EmailIcon";

const ScannedPetDetail = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const petId = searchParams.get(queryParams.PETID);
  const locale = useLocale();

  const [showLocationPrompt, setShowLocationPrompt] = useState<boolean>(true);
  const [petInformation, setPetInformation] = useState<PetInformationDTO>();

  const currentYear = new Date().getFullYear();
  const age = currentYear - Number(petInformation?.petDTO.birthYear);

  const handleLocationPermission = (info: PetInformationDTO) => {
    if (petId == null) return;
    if (petInformation == null) return;
    setShowLocationPrompt(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const scannedLocationDTO: ScannedLocationDTO = {
          latitude,
          longitude,
          pet: info.petDTO,
          locale,
        };

        await toast.promise(
          saveScannedLocation(scannedLocationDTO),
          {
            pending: t("ScannedPetDetail.notificationPending"),
            success: {
              render() {
                confetti({
                  particleCount: 150,
                  spread: 80,
                  origin: { y: 0.6 },
                });
                return t("ScannedPetDetail.notificationSuccess");
              },
            },
            error: t("ScannedPetDetail.notificationError"),
          },
          { position: "bottom-right", toastId: `notify-owner-${petId}` }
        );
      },
      (error) => {
        console.warn("Standort konnte nicht ermittelt werden: ", error);
        saveScannedLocation({
          pet: petInformation.petDTO,
          locale,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // prevents caching
      }
    );
  };

  useEffect(() => {
    if (petId == null) return;

    const fetchPetInfo = async () => {
      const data = await fetchPetInformationDTO(Number(petId));
      setPetInformation(data);
    };

    fetchPetInfo();
  }, [petId]);

  useEffect(() => {
    if (!petInformation) return;

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          handleLocationPermission(petInformation);
        }
      })
      .catch((error) => {
        console.warn("Permission check failed:", error);
      });
  }, [petInformation]);

  const handleNoConsent = async () => {
    if (!petInformation) return;
    setShowLocationPrompt(false);

    await toast.promise(
      saveScannedLocation({
        pet: petInformation.petDTO,
        locale,
      }),
      {
        pending: t("ScannedPetDetail.notificationPending"),
        success: {
          render() {
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
            });
            return t("ScannedPetDetail.notificationSuccess");
          },
        },
        error: t("ScannedPetDetail.notificationError"),
      },
      { position: "bottom-right", toastId: `notify-owner-${petId}` }
    );
  };

  if (petInformation === null) {
    return <Cat />;
  }

  return (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      {showLocationPrompt && (
        <div className={styles.consentShareCoordinates}>
          <div className={styles.consentBox}>
            <p>
              {t("ScannedPetDetail.consentLocation1")}
              <br />
              {t("ScannedPetDetail.consentLocation2")}
            </p>
            <button onClick={() => handleNoConsent()}>
              {t("ScannedPetDetail.consentNotAllowLocation")}
            </button>
            <button onClick={() => handleLocationPermission(petInformation!!)}>
              {t("ScannedPetDetail.consentAllowLocation")}
            </button>
          </div>
        </div>
      )}
      {!showLocationPrompt && (
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
              <svg
                className={styles.card__arc}
                xmlns="http://www.w3.org/2000/svg"
              >
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
                  <p>{age || "-"}</p>
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
      )}
    </>
  );
};

export default ScannedPetDetail;
