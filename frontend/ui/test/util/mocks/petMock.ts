import { Pet } from "@/types/Pet";

export const petMock: Pet = {
  id: 1,
  photoUrl: null,
  name: "Buddy",
  breed: "Golden Retriever",
  age: 5,
  sex: "Male",
  owner: {
    id: 1,
    firstName: "Dezso",
    lastName: "Binder",
    address: {
      id: 1,
      country: "Austria",
      city: "Graz",
      zipCode: "1111",
      street: "Test Street 55",
      createdAt: String(Date.now()),
      modifiedAt: null,
    },
    phone: "123456789",
    email: "owner@example.com",
    createdAt: String(Date.now()),
    modifiedAt: null,
  },
  createdAt: String(Date.now()),
  modifiedAt: null,
};
