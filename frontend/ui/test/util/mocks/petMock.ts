import { Pet } from "@/types/Pet";

export const petMock: Pet = {
  id: 1,
  photoUrl: null,
  name: "Buddy",
  breed: "Golden Retriever",
  age: 5,
  sex: "Male",
  createdAt: String(Date.now()),
  modifiedAt: null,
};
