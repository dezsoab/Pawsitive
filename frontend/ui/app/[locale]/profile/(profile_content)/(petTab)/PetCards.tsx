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
import DeleteModal from "./DeleteModal";

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
  const [showDeletePetModal, setShowDeletePetModal] = useState(false);

  const [cropModal, setCropModal] = useState<{
    file: File;
    url: string;
    photoUrl?: string;
  } | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const birthYearRef = useRef<HTMLInputElement>(null);
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
      birthYear: birthYearRef.current!.value,
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

  const onDeleteHandler = () => {
    setShowDeletePetModal(true);
  };

  return (
    <div>
      {showDeletePetModal && (
        <DeleteModal
          chosenPet={activePet}
          closeHandler={setShowDeletePetModal}
        />
      )}
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
          <AddPetCard profile={profile} setProfile={setProfile} />
          {profile.pets
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((pet) => {
              const isEditMode = editPetId === pet.id;

              const currentYear = new Date().getFullYear();
              const age = currentYear - Number(pet.birthYear);

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
                        <div className={styles.card__header_text}>
                          <h3 className={styles.card__title}>{pet.name}</h3>
                        </div>
                        <div
                          className={styles.editOption}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditMode(pet.id);
                            handleCardClick(pet);
                          }}
                        >
                          <button
                            className={`${"edit_btn"} ${
                              activePet === pet ? styles.active : ""
                            }`}
                          >
                            {isEditMode ? <StopEditIcon /> : <EditIcon />}
                          </button>
                          <span>
                            {isEditMode
                              ? t("Dashboard.stopEditAction")
                              : t("Dashboard.startEditAction")}
                          </span>
                        </div>
                      </div>

                      <div className={styles.card__infos}>
                        {/* ================= Edit mode ================= */}
                        {isEditMode ? (
                          <form
                            key={pet.id}
                            onSubmit={(e) =>
                              updatePetInformationSubmitHandler(e, pet)
                            }
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label htmlFor={`name-${pet.id}`}>
                              {t("Pet.name")}:{" "}
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
                              {t("Pet.breed")}:{" "}
                            </label>
                            <input
                              ref={breedRef}
                              type="text"
                              id={`breed-${pet.id}`}
                              defaultValue={pet.breed}
                            />
                            <br />
                            <label htmlFor="birthYear">
                              {t("Pet.birthYear")}:{" "}
                            </label>
                            <input
                              ref={birthYearRef}
                              type="number"
                              id="birthYear"
                              placeholder={t("Pet.birthYear")}
                              min={2000} // assuming a pet is no older 25yrs
                              max={new Date().getFullYear()}
                              defaultValue={pet.birthYear}
                              required
                            />
                            <br />
                            <label htmlFor={`sex-${pet.id}`}>
                              {t("Pet.sex.name")}:{" "}
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
                            <div className={styles.actionBtns}>
                              <button
                                type="button"
                                className={styles.deleteBtn}
                                onClick={onDeleteHandler}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                                </svg>
                                {t("Dashboard.delete")}
                              </button>

                              <button
                                type="submit"
                                className={styles.submitBtn}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13 3h2.996v5h-2.996v-5zm11 1v20h-24v-24h20l4 4zm-17 5h10v-7h-10v7zm15-4.171l-2.828-2.829h-.172v9h-14v-9h-3v20h20v-17.171z" />
                                </svg>
                                {t("Dashboard.save")}
                              </button>
                            </div>
                          </form>
                        ) : (
                          //  ================= Display mode =================
                          <>
                            <p>
                              {t("Pet.name")}: {pet.name}
                            </p>
                            <p>
                              {t("Pet.breed")}: {pet.breed}
                            </p>
                            <p>
                              {t("Pet.age")}: {age}
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
        </ul>
      </div>
    </div>
  );
};

export default PetCards;
