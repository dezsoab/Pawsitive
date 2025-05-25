import { backendRoutes } from "@/enums/backendRoutes";
import { apiFetch } from "./apiFetch";

export default async function userIsOwnerOfPet(
  petId: String
): Promise<boolean> {
  return apiFetch(`${backendRoutes.ISAUTHENTICATEDUSEROWNEROFPET}/${petId}`);
}
