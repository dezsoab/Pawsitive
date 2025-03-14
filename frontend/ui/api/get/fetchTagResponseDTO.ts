import { TagResponseDTO } from "@/types/TagResponseDTO";
import { apiFetch } from "./apiFetch";
import { backendRoutes } from "@/enums/backendRoutes";

export const fetchTagResponseDTO = async (
  tagId: string
): Promise<TagResponseDTO> => {
  return await apiFetch(`${backendRoutes.NFCTAG}/${tagId}`);
};
