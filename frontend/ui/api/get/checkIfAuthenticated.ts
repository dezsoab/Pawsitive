import { apiFetch } from "./apiFetch";
import { backendRoutes } from "@/enums/backendRoutes";

export /**
 *  Returns true if user has valid JWT auth token in Header Cookies
 *  return false otherwise
 * @return {*}  {Promise<boolean>}
 */
const checkIfAuthenticated = async (): Promise<boolean> => {
  return apiFetch(`${backendRoutes.ISAUTHENTICATED}`);
};
