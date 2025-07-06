import { PetDTO } from "./PetDTO";

export interface ScannedLocationDTO {
  latitude: number;
  longitude: number;
  pet: PetDTO;
  locale: string;
}
