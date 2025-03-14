import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import { apiPost } from "./apiPost";
import { backendRoutes } from "@/enums/backendRoutes";

export const createOwner = async (owner: RegisterOwnerDTO) => {
  return await apiPost<{ message: string }, RegisterOwnerDTO>(
    backendRoutes.REGISTER,
    owner
  );
};
