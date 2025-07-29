import { backendRoutes } from "@/enums/backendRoutes";
import { apiPost } from "./apiPost";
import { ForgotPasswordRequestDTO } from "@/types/ForgotPasswordRequestDTO";

export const sendEmailAddress = async (dto: ForgotPasswordRequestDTO) => {
  return await apiPost<{ message: string }, ForgotPasswordRequestDTO>(
    backendRoutes.FORGOT_PASSWORD,
    dto
  );
};
