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
import imageCompression from "browser-image-compression";
import { fetchPresignedPetUrl } from "@/api/get/fetchPresignedPetUrl";
import { PetDTO } from "@/types/PetDTO";

import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import { addPetAPI } from "@/api/post/addPetAPI";
import { CreatePetDTO } from "@/types/CreatePetDTO";

const MAX_IMAGE_SIZE_TO_COMPRESS = parseFloat(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_TO_COMPRESS || "1.5"
);
const MAX_IMAGE_SIZE_TO_CHOOSE = parseFloat(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_TO_CHOOSE || "4"
);

const isFileTooLarge = (file: File): boolean =>
  file.size > MAX_IMAGE_SIZE_TO_CHOOSE * 1024 * 1024;

const isFileTypeSupported = (file: File): boolean =>
  ["image/jpeg", "image/png"].includes(file.type);

const imageCompressionOptions = {
  maxSizeMB: MAX_IMAGE_SIZE_TO_COMPRESS,
  maxWidthOrHeight: 1800,
  useWebWorker: true,
};

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

interface PetCardsProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const AddPetCard = ({ profile, setProfile }: PetCardsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cropModal, setCropModal] = useState<{
    file: File;
    petId: number;
    url: string;
  } | null>(null);

  const [imageCropResult, setimageCropResult] = useState<{
    fileName: string;
    compressedFile: File;
    petId: number;
  } | null>();

  const nfcTagIdRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLSelectElement>(null);
  const t = useTranslations();

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

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

  const handleCroppedImage = async (croppedBlob: Blob) => {
    if (!cropModal) return;
    const { file, petId } = cropModal;

    const fileName = `pet-${petId}.${file.name.split(".").pop()}`;
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

  const compressImage = async (file: File): Promise<File> =>
    await imageCompression(file, imageCompressionOptions);

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
      if (imageCropResult) {
        const { compressedFile, fileName } = imageCropResult;
        photoUrl = await uploadToS3(compressedFile, fileName);
      }

      const newPet: CreatePetDTO = {
        nfcTagId: nfcTagIdRef.current!.value,
        name: nameRef.current!.value,
        age: ageRef.current!.value,
        breed: breedRef.current!.value,
        sex: sexRef.current!.value as Gender,
        photoUrl,
        ownerEmail: profile.email,
      };

      const savedPet: PetDTO = await addPet(newPet);
      console.log(savedPet);
      setProfile((prev) => ({
        ...prev!,
        pets: [...prev!.pets, savedPet],
      }));
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
          onCropComplete={handleCroppedImage}
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
            />
            <label htmlFor={`name-${1}`}>{t("Pet.name")}:</label>
            <input
              ref={nameRef}
              type="text"
              // id={`name-${pet.id}`}
              placeholder="Add pet name"
            />
            <br />
            <label htmlFor="breed">{t("Pet.breed")}:</label>
            <input
              ref={breedRef}
              type="text"
              id="breed"
              placeholder="Add pet breed"
            />
            <br />
            <label htmlFor="age">{t("Pet.age")}:</label>
            <input
              ref={ageRef}
              type="number"
              id="age"
              placeholder="Add pet age"
              min={0}
              max={20}
            />
            <br />
            <label htmlFor="sex">{t("Pet.sex.name")}:</label>
            <select ref={sexRef} id="sex">
              <option value={Gender.MALE}>{t("Pet.sex.male")}</option>
              <option value={Gender.FEMALE}>{t("Pet.sex.female")}</option>
            </select>
            <label htmlFor={`file-upload-${1}`}>Add pet image</label>
            <input
              id={`file-upload-${1}`}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, 1);
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              SAVE
            </button>
            <button type="reset" onClick={toggleEdit}>
              CANCEL
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPetCard;
