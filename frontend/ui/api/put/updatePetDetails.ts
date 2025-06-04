import { backendRoutes } from "@/enums/backendRoutes";
import { apiPut } from "./apiPut";
import { PetDTO } from "@/types/PetDTO";

export const updatePet = async (petDto: PetDTO) => {
  return await apiPut<{ message: string }, PetDTO>(
    backendRoutes.PET + "/" + petDto.id,
    petDto
  );
};
