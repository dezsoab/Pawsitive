export const apiPost = async <T, U>(endpoint: string, body: U): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "An error occurred during post request"
    );
  }

  const data: T = await res.json();
  return data;
};
