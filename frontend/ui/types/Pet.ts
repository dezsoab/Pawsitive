import { Owner } from "./Owner";

export interface Pet {
  id: number;
  name: string;
  breed: string | null;
  age: number;
  sex: string;
  photoUrl: string | null;
  owner: Owner;
  createdAt: string;
  modifiedAt: string | null;
}
