import { backendRoutes } from "@/enums/backendRoutes";

import { PetDTO } from "@/types/PetDTO";
import { apiPost } from "./apiPost";
import { CreatePetDTO } from "@/types/CreatePetDTO";

export const addPetAPI = async (createPetDto: CreatePetDTO) => {
  return await apiPost<PetDTO, CreatePetDTO>(backendRoutes.PET, createPetDto);
};
