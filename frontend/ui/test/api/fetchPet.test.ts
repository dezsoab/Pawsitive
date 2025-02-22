import { fetchPet } from "@/api/get/fetchPet";
import { Pet } from "@/types/Pet";

global.fetch = jest.fn();

describe("fetchPet", () => {
  const petMock: Pet = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches the pet successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(petMock),
    });

    const id = 1;
    const result = await fetchPet(id);

    expect(result).toEqual(petMock);
  });

  it("throws an error when the fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const id = 1;

    await expect(fetchPet(id)).rejects.toThrow("Failed to fetch from pet/1");
  });
});
