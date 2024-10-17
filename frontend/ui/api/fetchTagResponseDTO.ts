import { TagResponseDTO } from "@/types/TagResponseDTO";
import { apiFetch } from "./apiFetch";

export const fetchTagResponseDTO = async (
  tagId: string
): Promise<TagResponseDTO> => {
  return await apiFetch(`nfcTag/${tagId}`);
};
