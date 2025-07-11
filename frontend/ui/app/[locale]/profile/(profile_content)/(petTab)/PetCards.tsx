import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import styles from "./PetsCarousel.module.css";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { updatePet } from "@/api/put/updatePetDetails";
import ImageCropperModal from "@/components/imgCropper/ImageCropperModal";
import { PetDTO } from "@/types/PetDTO";
import { Gender } from "@/enums/gender";
import AddPetCard from "./AddPetCard";

import {
  handleCroppedImage,
  handleFileSelect,
  uploadToS3,
} from "@/util/uploadImageUtils";
import { apiMethod } from "@/enums/apiMethod";
import { EditIcon, StopEditIcon } from "@/components/editButton/EditButton";
import { getTranslatedSex } from "@/util/translationHelper";

interface PetCardsProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const updatePetInfo = async (updatedPet: PetDTO): Promise<void> => {
  await toast.promise(
    updatePet(updatedPet),
    {
      pending: "Updating pet...",
      success: "Pet updated successfully!",
      error: "Failed to update pet.",
    },
    { position: "bottom-right", toastId: `update-${updatedPet.id}` }
  );
};

const PetCards = ({ profile, setProfile }: PetCardsProps) => {
  const [activePet, setActivePet] = useState<PetDTO>();
  const [editPetId, setEditPetId] = useState<number | null>(null);

  const [cropModal, setCropModal] = useState<{
    file: File;
    url: string;
    photoUrl?: string;
  } | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLSelectElement>(null);

  const t = useTranslations();

  const toggleEditMode = (petId: number) => {
    if (editPetId !== null && editPetId !== petId) {
      const confirmSwitch = window.confirm(
        "Discard changes and edit another pet?"
      );
      if (!confirmSwitch) return;
    }
    setEditPetId((prevId) => (prevId === petId ? null : petId));
  };

  const handleCardClick = (pet: PetDTO) => {
    setActivePet((prevPet) => (prevPet === pet ? undefined : pet));
  };

  const [imageCropResult, setImageCropResult] = useState<{
    fileName: string;
    compressedFile: File;
  } | null>(null);

  const updatePetInformationSubmitHandler = async (
    e: FormEvent,
    originalPet: PetDTO
  ) => {
    e.preventDefault();

    let photoUrl = originalPet.photoUrl;

    if (imageCropResult) {
      const { compressedFile, fileName } = imageCropResult;
      photoUrl = await uploadToS3(compressedFile, fileName, apiMethod.PUT);
    }

    const updatedPet: PetDTO = {
      ...originalPet,
      name: nameRef.current!.value,
      age: ageRef.current!.value,
      breed: breedRef.current!.value,
      sex: sexRef.current!.value as Gender,
      photoUrl,
    };

    await updatePetInfo(updatedPet);

    const updatedPets = profile.pets.map((pet) =>
      pet.id === updatedPet.id ? updatedPet : pet
    );
    setProfile({ ...profile, pets: updatedPets });
    setImageCropResult(null);
    setEditPetId(null);
  };

  return (
    <div>
      {cropModal && (
        <ImageCropperModal
          imageSrc={cropModal.url}
          onCancel={() => setCropModal(null)}
          onCropComplete={(file) =>
            handleCroppedImage(
              file,
              cropModal,
              setCropModal,
              setImageCropResult,
              cropModal.photoUrl
            )
          }
        />
      )}
      <div className={styles.petContainer}>
        <ul className={styles.cards}>
          {profile.pets
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((pet) => {
              const isEditMode = editPetId === pet.id;

              return (
                <li key={pet.id}>
                  <div
                    className={`${styles.card} ${
                      activePet === pet ? styles.active : ""
                    }`}
                    onClick={() => handleCardClick(pet)}
                  >
                    <Image
                      className={styles.card__image}
                      src={
                        pet.photoUrl
                          ? `${pet.photoUrl}?t=${new Date().getTime()}`
                          : "/assets/missing-image2.svg"
                      }
                      alt={pet.name}
                      width={250}
                      height={250}
                    />
                    <div className={styles.card__overlay}>
                      <div className={styles.card__header}>
                        <svg
                          className={styles.card__arc}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path />
                        </svg>
                        <Image
                          className={styles.card__thumb}
                          src={
                            pet.photoUrl
                              ? `${pet.photoUrl}?t=${new Date().getTime()}`
                              : "/assets/missing-image.svg"
                          }
                          alt={pet.name}
                          width={250}
                          height={250}
                        />
                        <div className={styles.card__header_text}>
                          <h3 className={styles.card__title}>{pet.name}</h3>
                          <span className={styles.card__status}>{pet.id}</span>
                        </div>
                        <div
                          className={styles.editOption}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditMode(pet.id);
                          }}
                        >
                          <button>
                            {isEditMode ? <StopEditIcon /> : <EditIcon />}
                          </button>
                          <span>
                            {isEditMode ? "stop editing" : "click to edit"}
                          </span>
                        </div>
                      </div>

                      <div className={styles.card__infos}>
                        {isEditMode ? (
                          <form
                            key={pet.id}
                            onSubmit={(e) =>
                              updatePetInformationSubmitHandler(e, pet)
                            }
                          >
                            <label htmlFor={`name-${pet.id}`}>
                              {t("Pet.name")}:
                            </label>
                            <input
                              ref={nameRef}
                              type="text"
                              id={`name-${pet.id}`}
                              defaultValue={pet.name}
                              required
                            />
                            <br />
                            <label htmlFor={`breed-${pet.id}`}>
                              {t("Pet.breed")}:
                            </label>
                            <input
                              ref={breedRef}
                              type="text"
                              id={`breed-${pet.id}`}
                              defaultValue={pet.breed}
                            />
                            <br />
                            <label htmlFor={`age-${pet.id}`}>
                              {t("Pet.age")}:
                            </label>
                            <input
                              ref={ageRef}
                              type="number"
                              inputMode="decimal"
                              pattern="[0-9]*"
                              id={`age-${pet.id}`}
                              defaultValue={pet.age}
                              min={0}
                              max={20}
                            />
                            <br />
                            <label htmlFor={`sex-${pet.id}`}>
                              {t("Pet.sex.name")}:
                            </label>
                            <select
                              ref={sexRef}
                              id={`sex-${pet.id}`}
                              defaultValue={pet.sex}
                            >
                              <option value={Gender.MALE}>
                                {t("Pet.sex.male")}
                              </option>
                              <option value={Gender.FEMALE}>
                                {t("Pet.sex.female")}
                              </option>
                            </select>
                            <p>Pet ID: {pet.id}</p>
                            <p>Tag ID: {pet.nfcTagId}</p>
                            <label htmlFor={`file-upload-${pet.id}`}>
                              {pet.photoUrl
                                ? t("Dashboard.updateAction") + ":"
                                : t("Dashboard.uploadAction") + ":"}
                            </label>
                            <input
                              id={`file-upload-${pet.id}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const modalData = handleFileSelect(file);
                                  if (modalData) {
                                    setCropModal({
                                      ...modalData,
                                      photoUrl: pet.photoUrl,
                                    });
                                  }
                                }
                              }}
                            />
                            <button type="submit">SAVE</button>
                          </form>
                        ) : (
                          <>
                            <p>
                              {t("Pet.name")}: {pet.name}
                            </p>
                            <p>
                              {t("Pet.breed")}: {pet.breed}
                            </p>
                            <p>
                              {t("Pet.age")}: {pet.age}
                            </p>
                            <p>
                              {t("Pet.sex.name")}:{" "}
                              {getTranslatedSex(t, pet.sex)}
                            </p>
                            <p>Pet ID: {pet.id}</p>
                            <p>Tag ID: {pet.nfcTagId}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          <AddPetCard profile={profile} setProfile={setProfile} />
        </ul>
      </div>
    </div>
  );
};

export default PetCards;
