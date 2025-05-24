import { backendRoutes } from "@/enums/backendRoutes";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import { apiPut } from "./apiPut";

export const updateUserInformation = async (
  userInformationDTO: ProfileInformationDTO
) => {
  return await apiPut<{ message: string }, ProfileInformationDTO>(
    backendRoutes.UPDATEPROFILE,
    userInformationDTO
  );
};
