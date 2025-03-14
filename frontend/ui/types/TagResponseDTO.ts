import { tagState } from "@/enums/tagState";

export interface TagResponseDTO {
  status: tagState.ASSIGNED | tagState.UNASSIGNED;
  petId: number;
}
