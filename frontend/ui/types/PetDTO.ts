export interface PetDTO {
  id: number;
  name: string;
  breed: string;
  age: string;
  sex: "Male" | "Female";
  nfcTagId: string;
  photoUrl?: string;
}
