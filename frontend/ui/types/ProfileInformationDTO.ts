import { PetDTO } from "./PetDTO";
import { PetOwnerDTO } from "./PetOwnerDTO";

export interface ProfileInformationDTO {
  email: string;
  owner: PetOwnerDTO;
  pets: PetDTO[];
}
