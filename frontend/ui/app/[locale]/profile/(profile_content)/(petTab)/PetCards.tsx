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
import { fetchPresignedPetUrl } from "@/api/get/fetchPresignedPetUrl";
import imageCompression from "browser-image-compression";
import ImageCropperModal from "@/components/imgCropper/ImageCropperModal";
import { PetDTO } from "@/types/PetDTO";
import { Gender } from "@/enums/gender";
import AddPetCard from "./AddPetCard";

import { v4 as uuidv4 } from "uuid";

interface PetCardsProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const MAX_IMAGE_SIZE_TO_COMPRESS = parseFloat(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_TO_COMPRESS || "1.5"
);
const MAX_IMAGE_SIZE_TO_CHOOSE = parseFloat(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_TO_CHOOSE || "4"
);

const imageCompressionOptions = {
  maxSizeMB: MAX_IMAGE_SIZE_TO_COMPRESS,
  maxWidthOrHeight: 1800,
  useWebWorker: true,
};

const isFileTooLarge = (file: File): boolean =>
  file.size > MAX_IMAGE_SIZE_TO_CHOOSE * 1024 * 1024;

const isFileTypeSupported = (file: File): boolean =>
  ["image/jpeg", "image/png"].includes(file.type);

const compressImage = async (file: File): Promise<File> =>
  await imageCompression(file, imageCompressionOptions);

const uploadToS3 = async (file: File, fileName: string): Promise<string> => {
  const { uploadUrl } = await fetchPresignedPetUrl(fileName);
  const photoUrl = uploadUrl.split("?")[0];

  await toast.promise(
    fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Cache-Control": "no-cache",
      },
      body: file,
    }),
    {
      pending: "Uploading image...",
      success: "Upload successful!",
      error: "Upload failed.",
    },
    { position: "bottom-right", toastId: `upload-${fileName}` }
  );

  return photoUrl;
};

const updatePetInfo = async (
  updatedPet: ProfileInformationDTO["pets"][0]
): Promise<void> => {
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
  const [activePetId, setActivePetId] = useState<number | null>(null);
  const [editPetId, setEditPetId] = useState<number | null>(null);

  const [cropModal, setCropModal] = useState<{
    file: File;
    petId: number;
    url: string;
  } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLSelectElement>(null);
  const petIdRef = useRef<HTMLParagraphElement>(null);
  const petTagIdRef = useRef<HTMLParagraphElement>(null);

  const t = useTranslations();

  const handleFileSelect = (file: File, petId: number) => {
    if (isFileTooLarge(file)) {
      toast.error(
        `File too large. Max ${MAX_IMAGE_SIZE_TO_CHOOSE}MB allowed.`,
        {
          position: "bottom-right",
        }
      );
      return;
    }

    if (!isFileTypeSupported(file)) {
      toast.error("Only JPEG and PNG images are allowed.", {
        position: "bottom-right",
      });
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setCropModal({ file, petId, url: fileUrl });
  };

  const sexTranslationMap = {
    MALE: t("Pet.sex.male"),
    FEMALE: t("Pet.sex.female"),
  };

  const toggleEditMode = (petId: number) => {
    if (editPetId !== null && editPetId !== petId) {
      const confirmSwitch = window.confirm(
        "Discard changes and edit another pet?"
      );
      if (!confirmSwitch) return;
    }
    setEditPetId((prevId) => (prevId === petId ? null : petId));
  };

  const handleCardClick = (petId: number) => {
    setActivePetId((prevId) => (prevId === petId ? null : petId));
  };

  const [imageCropResult, setimageCropResult] = useState<{
    fileName: string;
    compressedFile: File;
    petId: number;
  } | null>();

  const updatePetInformationSubmitHandler = async (
    e: FormEvent,
    originalPet: PetDTO
  ) => {
    e.preventDefault();

    let photoUrl = originalPet.photoUrl ?? "";

    if (imageCropResult) {
      const { compressedFile, fileName } = imageCropResult;
      photoUrl = await uploadToS3(compressedFile, fileName);
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
    setimageCropResult(null);
  };

  const handleCroppedImage = async (croppedBlob: Blob) => {
    if (!cropModal) return;
    const { file, petId } = cropModal;

    const extension = file.name.split(".").pop();
    const fileName = `pet-${uuidv4()}.${extension}`;
    const compressedFile = await compressImage(
      new File([croppedBlob], fileName, { type: croppedBlob.type })
    );

    setCropModal(null);

    setimageCropResult({
      fileName,
      compressedFile,
      petId,
    });
  };

  const getTranslatedSex = (sex: Gender | undefined): string => {
    return sex ? sexTranslationMap[sex] : "-";
  };

  return (
    <div>
      {cropModal && (
        <ImageCropperModal
          imageSrc={cropModal.url}
          onCancel={() => setCropModal(null)}
          onCropComplete={handleCroppedImage}
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
                      activePetId === pet.id ? styles.active : ""
                    }`}
                    onClick={() => handleCardClick(pet.id)}
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

                        <button
                          onClick={(e) => {
                            toggleEditMode(pet.id);
                          }}
                        >
                          {isEditMode ? "Cancel" : "Edit"}
                        </button>
                      </div>

                      <div className={styles.card__infos}>
                        {isEditMode ? (
                          <>
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
                              <p ref={petIdRef}>Pet ID: {pet.id}</p>
                              <p ref={petTagIdRef}>Tag ID: {pet.nfcTagId}</p>
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
                                  if (file) handleFileSelect(file, pet.id);
                                }}
                              />
                              <button type="submit">SAVE</button>
                            </form>
                          </>
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
                              {t("Pet.sex.name")}: {getTranslatedSex(pet.sex)}
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
