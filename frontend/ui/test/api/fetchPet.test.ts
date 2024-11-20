import { fetchPet } from "@/api/fetchPet";
import { petMock } from "../util/mocks/petMock";

global.fetch = jest.fn();

describe("fetchPet", () => {
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

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/pet/${id}`
    );
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
