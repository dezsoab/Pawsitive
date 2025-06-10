import { Gender } from "@/enums/gender";

export interface PetDTO {
  id: number;
  name: string;
  breed: string;
  age: string;
  sex: Gender;
  nfcTagId: string;
  photoUrl?: string;
}
