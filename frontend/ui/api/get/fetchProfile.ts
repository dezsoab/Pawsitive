import { backendRoutes } from "@/enums/backendRoutes";
import { apiFetch } from "./apiFetch";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";

export const fetchProfileInformation =
  async (): Promise<ProfileInformationDTO> => {
    return await apiFetch(`${backendRoutes.PROFILE}`);
  };
