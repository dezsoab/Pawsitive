export const apiFetch = async <T>(endpoint: string): Promise<T> => {
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
