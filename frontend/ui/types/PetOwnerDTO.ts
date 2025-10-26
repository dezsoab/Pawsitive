import { AddressDTO } from "./AddressDTO";

export interface PetOwnerDTO {
  firstName: string;
  lastName: string;
  phone: string;
  secondaryPhone?: string | null;
  address?: AddressDTO;
  isAddressVisible: boolean;
}
