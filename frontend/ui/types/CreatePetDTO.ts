import { Gender } from "@/enums/gender";

export interface CreatePetDTO {
  name: string;
  breed: string;
  birthYear: string;
  sex: Gender;
  nfcTagId: string;
  photoUrl?: string;
  ownerEmail: string;
}
