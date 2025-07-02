import { AddressDTO } from "./AddressDTO";
import { PetDTO } from "./PetDTO";
import { PetOwnerDTO } from "./PetOwnerDTO";

export interface PetInformationDTO {
  petDTO: PetDTO;
  ownerDTO: PetOwnerDTO;
  email: string;
}
