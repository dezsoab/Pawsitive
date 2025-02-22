export const apiPost = async <T, U>(endpoint: string, body: U): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      `Failed POST request to ${endpoint}: ${res.status} ${res.statusText}`
    );
  }

  try {
    return (await res.json()) as T;
  } catch {
    console.info(`Response from ${endpoint} is not JSON. Returning as text.`);
    return (await res.text()) as T;
  }
};
