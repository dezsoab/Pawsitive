export const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  const data: T = await res.json();
  return data;
};
