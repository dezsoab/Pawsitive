import { CreatedOwnerResponse } from "@/types/CreatedOwnerResponse";
import { apiPost } from "./apiPost";

export const createOwner = async (owner: CreatedOwnerResponse) => {
  await apiPost("owner", owner);
};
