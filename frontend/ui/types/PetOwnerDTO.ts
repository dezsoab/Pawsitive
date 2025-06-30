import { AddressDTO } from "./AddressDTO";

export interface PetOwnerDTO {
  firstName: string;
  lastName: string;
  phone: string;
  address?: AddressDTO;
  isAddressVisible: boolean;
}
