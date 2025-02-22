import { backendRoutes } from "@/enums/backendRoutes";
import { apiPost } from "./apiPost";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";

export const loginOwner = async (owner: LoginOwnerDTO) => {
  await apiPost(backendRoutes.LOGIN, owner);
};
