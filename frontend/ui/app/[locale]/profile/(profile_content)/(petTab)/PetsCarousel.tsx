import React, { Dispatch, SetStateAction } from "react";

import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import PetCards from "./PetCards";

interface PetsCarouselProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const PetsCarousel = ({ profile, setProfile }: PetsCarouselProps) => {
  return (
    <div>
      <PetCards profile={profile} setProfile={setProfile} />
    </div>
  );
};

export default PetsCarousel;
