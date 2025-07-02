import { backendRoutes } from "@/enums/backendRoutes";
import { apiFetch } from "./apiFetch";
import { PetInformationDTO } from "@/types/PetInformationDTO";

export const fetchPetInformationDTO = async (
  petId: number
): Promise<PetInformationDTO> => {
  return apiFetch(`${backendRoutes.PETINFORMATION}/${petId}`);
};
