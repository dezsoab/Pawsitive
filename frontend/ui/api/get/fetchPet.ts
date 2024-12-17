import { Pet } from "@/types/Pet";
import { apiFetch } from "./apiFetch";

export const fetchPet = async (id: number): Promise<Pet> => {
  return apiFetch(`pet/${id}`);
};
