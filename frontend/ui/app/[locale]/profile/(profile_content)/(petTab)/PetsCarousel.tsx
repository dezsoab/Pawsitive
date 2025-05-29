import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import styles from "./PetsCarousel.module.css";
import { fetchPresignedPetUrl } from "@/api/get/fetchPresignedPetUrl";
import { updatePet } from "@/api/put/updatePetDetails";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import ImageCropperModal from "@/components/imgCropper/ImageCropperModal";

interface PetsCarouselProps {
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

const PetsCarousel = ({ profile, setProfile }: PetsCarouselProps) => {
  const [cropModal, setCropModal] = useState<{
    file: File;
    petId: number;
    url: string;
  } | null>(null);

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

    const photoUrl = await uploadToS3(compressedFile, fileName);

    let updatedPet;
    const updatedPets = profile.pets.map((pet) => {
      if (pet.id === petId) {
        updatedPet = { ...pet, photoUrl };
        return updatedPet;
      }
      return pet;
    });

    setProfile({ ...profile, pets: updatedPets });
    if (updatedPet) {
      await updatePetInfo(updatedPet);
    }
    setCropModal(null);
  };

  return (
    <div className={styles.petContainer}>
      {cropModal && (
        <ImageCropperModal
          imageSrc={cropModal.url}
          onCancel={() => setCropModal(null)}
          onCropComplete={handleCroppedImage}
        />
      )}
      {profile.pets.map((pet) => (
        <div key={pet.id} className={styles.petCard}>
          <Image
            className={styles.petImage}
            src={
              pet.photoUrl
                ? `${pet.photoUrl}?t=${new Date().getTime()}`
                : "/assets/missing-image.jpg"
            }
            alt={pet.name}
            width={100}
            height={100}
          />
          <p>Name: {pet.name}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Sex: {pet.sex}</p>
          <p>Pet ID: {pet.id}</p>
          <p>Tag ID: {pet.nfcTagId}</p>
          <label htmlFor={`file-upload-${pet.id}`}>
            {pet.photoUrl ? "Update Picture" : "Add Picture"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file, pet.id);
              e.target.value = "";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PetsCarousel;
