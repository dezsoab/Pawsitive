import { backendRoutes } from "@/enums/backendRoutes";
import { apiPost } from "./apiPost";
import { ContactUsEmailRequestDTO } from "@/types/ContactUsEmailRequestDTO";

export const sendContactUsInquiry = async (
  emailRequestDTO: ContactUsEmailRequestDTO
) => {
  return await apiPost<{ message: string }, ContactUsEmailRequestDTO>(
    backendRoutes.CONTACTUS,
    emailRequestDTO
  );
};
