import { backendRoutes } from "@/enums/backendRoutes";
import { apiPost } from "./apiPost";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";

export const loginOwner = async (owner: LoginOwnerDTO) => {
  return await apiPost<{ message: string }, LoginOwnerDTO>(
    backendRoutes.LOGIN,
    owner
  );
};
