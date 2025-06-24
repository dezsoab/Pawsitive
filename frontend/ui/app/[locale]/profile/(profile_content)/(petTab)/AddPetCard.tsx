"use client";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

import styles from "./AddPetCard.module.css";
import { Gender } from "@/enums/gender";
import { useTranslations } from "next-intl";
import ImageCropperModal from "@/components/imgCropper/ImageCropperModal";
import { toast } from "react-toastify";
import { PetDTO } from "@/types/PetDTO";

import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import { addPetAPI } from "@/api/post/addPetAPI";
import { CreatePetDTO } from "@/types/CreatePetDTO";
import { updatePet } from "@/api/put/updatePetDetails";
import {
  handleCroppedImage,
  handleFileSelect,
  uploadToS3,
} from "@/util/uploadImageUtils";
import { apiMethod } from "@/enums/apiMethod";
import { useSearchParams } from "next/navigation";

interface PetCardsProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const AddPetCard = ({ profile, setProfile }: PetCardsProps) => {
  const searchParams = useSearchParams();
  const tagIdInUrl = searchParams.get("tagId");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cropModal, setCropModal] = useState<{
    file: File;
    url: string;
  } | null>(null);

  const [imageCropResult, setimageCropResult] = useState<{
    fileName: string;
    compressedFile: File;
  } | null>(null);

  const nfcTagIdRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLSelectElement>(null);
  const t = useTranslations();

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const addPet = async (createdPetDetail: CreatePetDTO): Promise<PetDTO> => {
    const response = await toast.promise(
      addPetAPI(createdPetDetail),
      {
        pending: "Updating pet...",
        success: {
          render({ data }: { data: PetDTO }) {
            return (
              "Tag has been successfully linked to " + data.name + " 🎉" ||
              "Something went wrong!"
            );
          },
        },
        error: {
          render({ data }: { data: Error }) {
            return data.message || "Something went wrong!";
          },
        },
      },
      {
        position: "bottom-right",
        toastId: `update-${createdPetDetail.nfcTagId}`,
      }
    );
    return response;
  };

  const addPetHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let photoUrl = "";

      const newPet: CreatePetDTO = {
        nfcTagId: nfcTagIdRef.current!.value,
        name: nameRef.current!.value,
        age: ageRef.current!.value,
        breed: breedRef.current!.value,
        sex: sexRef.current!.value as Gender,
        photoUrl: "",
        ownerEmail: profile.email,
      };

      const savedPet: PetDTO = await addPet(newPet);
      console.log(savedPet);

      if (imageCropResult) {
        const { compressedFile, fileName } = imageCropResult;
        photoUrl = await uploadToS3(compressedFile, fileName, apiMethod.PUT);

        // Update savedPet with the new photo URL
        const updatedPet: PetDTO = await updatePet({
          ...savedPet,
          photoUrl,
        });

        setProfile((prev) => ({
          ...prev!,
          pets: [...prev!.pets, updatedPet],
        }));
      } else {
        // in case there was no image upload set the pet in local state as is
        setProfile((prev) => ({
          ...prev!,
          pets: [...prev!.pets, savedPet],
        }));
      }
      setimageCropResult(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Failed to save pet", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {cropModal && (
        <ImageCropperModal
          imageSrc={cropModal.url}
          onCancel={() => setCropModal(null)}
          onCropComplete={(file) =>
            handleCroppedImage(
              file,
              cropModal,
              setCropModal,
              setimageCropResult
            )
          }
        />
      )}
      {!isEditMode && (
        <li onClick={toggleEdit} key={"add-pet"}>
          <div className={styles.card}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={styles.plus_icon}
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
            <p>ADD PET</p>
          </div>
        </li>
      )}
      {isEditMode && (
        <div className={styles.card}>
          <form key={"add-pet-form"} onSubmit={(e) => addPetHandler(e)}>
            <label htmlFor="nfcTagId">NFC TAG ID:</label>
            <input
              ref={nfcTagIdRef}
              type="text"
              id="nfcTagId"
              placeholder="NFC Tag ID"
              required
              defaultValue={tagIdInUrl ?? ""}
            />
            <label htmlFor="petName">{t("Pet.name")}:</label>
            <input
              ref={nameRef}
              type="text"
              id="petName"
              placeholder={t("Pet.name")}
              required
            />
            <label htmlFor="breed">{t("Pet.breed")}:</label>
            <input
              ref={breedRef}
              type="text"
              id="breed"
              placeholder={t("Pet.breed")}
            />
            <label htmlFor="age">{t("Pet.age")}:</label>
            <input
              ref={ageRef}
              type="number"
              inputMode="decimal"
              pattern="[0-9]*"
              id="age"
              placeholder={t("Pet.age")}
              min={0}
              max={20}
              required
            />
            <label htmlFor="sex">{t("Pet.sex.name")}:</label>
            <select ref={sexRef} id="sex" required>
              <option value={Gender.MALE}>{t("Pet.sex.male")}</option>
              <option value={Gender.FEMALE}>{t("Pet.sex.female")}</option>
            </select>
            <label htmlFor={`file-upload-${1}`}>
              {t("Dashboard.uploadAction")}
            </label>
            <input
              id={`file-upload-${1}`}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const modalData = handleFileSelect(file);
                  if (modalData) {
                    setCropModal({
                      ...modalData,
                    });
                  }
                }
              }}
            />
            <div className={styles.buttonsContainer}>
              <button type="reset" onClick={toggleEdit}>
                {t("Dashboard.cancel")}
              </button>
              <button type="submit" disabled={isSubmitting}>
                {t("Dashboard.save")}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPetCard;
