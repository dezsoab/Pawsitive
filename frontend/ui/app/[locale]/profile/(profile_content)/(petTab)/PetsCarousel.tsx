import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, SetStateAction } from "react";

interface PetsCarouselProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const PetsCarousel = ({ profile, setProfile }: PetsCarouselProps) => {
  return <div>PetsCarousel</div>;
};

export default PetsCarousel;
