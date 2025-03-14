export interface Address {
  id?: number;
  country: string;
  city: string;
  zipCode: string;
  street: string;
  createdAt?: string;
  modifiedAt?: string | null;
}
