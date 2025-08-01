import { ResetPasswordDTO } from "@/types/ResetPasswordDTO";
import { apiPost } from "./apiPost";
import { backendRoutes } from "@/enums/backendRoutes";

export const resetPassword = async (dto: ResetPasswordDTO) => {
  return await apiPost<{ message: string }, ResetPasswordDTO>(
    backendRoutes.RESET_PASSWORD,
    dto
  );
};
