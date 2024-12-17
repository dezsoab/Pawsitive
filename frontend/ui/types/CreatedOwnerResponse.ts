import { Address } from "./Address";

export interface CreatedOwnerResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}
