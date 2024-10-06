import { Pet } from "@/types/Pet";

export const fetchPet = async (id: number): Promise<Pet> => {
  console.log(`${process.env.PUBLIC_API_URL}/pet/${id}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch pet");
  }

  const pet: Pet = await res.json();
  return pet;
};
