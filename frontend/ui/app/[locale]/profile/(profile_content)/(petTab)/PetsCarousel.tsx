import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, SetStateAction } from "react";

import styles from "./PetsCarousel.module.css";
import { cloneUniformsGroups } from "three/src/renderers/shaders/UniformsUtils.js";
import { fetchPresignedPetUrl } from "@/api/get/fetchPresignedPetUrl";

interface PetsCarouselProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const PetsCarousel = ({ profile, setProfile }: PetsCarouselProps) => {
  const handleFileUpload = async (file: File, petId: number) => {
    const fileName = `pet-${petId}-${Date.now()}.${file.name.split(".").pop()}`;

    console.log(fileName);

    // Generate pre-signed URL from backend
    const { uploadUrl } = await fetchPresignedPetUrl(fileName);

    // 2. Upload the file to S3 using the pre-signed url
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Cache-Control": "no-cache", "Content-Type": file.type },
      body: file,
    });

    // TODO: save this public url under the pet -> to retrieve picture in the future
    const imageUrl = uploadUrl.split("?")[0];

    console.log(`Image uploaded. Public URL: ${imageUrl}`);
  };

  return (
    <div className={styles.petContainer}>
      {profile.pets.map((pet) => (
        <div key={pet.id} className={styles.petCard}>
          <p>Name: {pet.name}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Sex: {pet.sex}</p>
          <p>Pet ID: {pet.id}</p>
          <p>Tag ID: {pet.nfcTagId}</p>

          {pet.imageUrl && (
            <img src={pet.imageUrl} alt={`${pet.name}`} width={150} />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0], pet.id);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PetsCarousel;
