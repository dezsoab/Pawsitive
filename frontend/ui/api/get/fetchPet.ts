import { Pet } from "@/types/Pet";
import { apiFetch } from "./apiFetch";
import { backendRoutes } from "@/enums/backendRoutes";

export const fetchPet = async (id: number): Promise<Pet> => {
  return apiFetch(`${backendRoutes.PET}/${id}`);
};
