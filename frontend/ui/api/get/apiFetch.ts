import { ClientPageRoot } from "next/dist/client/components/client-page";

export const apiFetch = async <T>(endpoint: string): Promise<T> => {
  console.info(
    "Fetching from following resource: " +
      process.env.NEXT_PUBLIC_API_URL +
      "/" +
      endpoint
  );

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  try {
    return (await res.json()) as T;
  } catch {
    console.info(`Response from ${endpoint} is not JSON. Returning as text.`);
    return (await res.text()) as T;
  }
};
