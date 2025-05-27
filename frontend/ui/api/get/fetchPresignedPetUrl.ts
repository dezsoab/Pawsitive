import { backendRoutes } from "@/enums/backendRoutes";
import { apiFetch } from "./apiFetch";
import { PresignedUrlResponseDTO } from "@/types/PresignedUrlResponseDTO";

export const fetchPresignedPetUrl = async (
  fileName: string
): Promise<PresignedUrlResponseDTO> => {
  return apiFetch(`${backendRoutes.PRESIGNEDPETURL}${fileName}`);
};
