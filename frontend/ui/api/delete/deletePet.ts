import { backendRoutes } from "@/enums/backendRoutes";
import { apiDelete } from "./apiDelete";
import { PetDTO } from "@/types/PetDTO";

export const deletePet = async (pet: PetDTO): Promise<{ message: string }> => {
  return apiDelete(`${backendRoutes.PET}`, pet);
};
