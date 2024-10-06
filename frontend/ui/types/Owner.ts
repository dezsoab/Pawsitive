import { Address } from "./Address";

export interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  createdAt: string;
  modifiedAt: string | null;
}
