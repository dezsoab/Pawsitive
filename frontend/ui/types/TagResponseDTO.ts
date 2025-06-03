import { tagState } from "@/enums/tagState";

export interface TagResponseDTO {
  status: tagState.CLAIMED | tagState.UNCLAIMED | tagState.AVAILABLE;
  petId: number;
}
