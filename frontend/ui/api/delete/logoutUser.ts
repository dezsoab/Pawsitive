import { backendRoutes } from "@/enums/backendRoutes";
import { apiDelete } from "./apiDelete";

export const logoutUser = async (): Promise<{ message: string }> => {
  return apiDelete(`${backendRoutes.LOGOUT}`, null);
};
