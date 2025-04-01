export const apiDelete = async <T, U>(
  endpoint: string,
  body: U
): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    let errorMessage = `Failed DELETE request to ${endpoint}: ${res.status}`;
    try {
      const errorResponse = await res.json();
      console.info(errorResponse);

      if (errorResponse.message) {
        errorMessage = errorResponse.message;
      }
    } catch {
      // If the response is not JSON, use the default error message
      console.error(`Response from ${endpoint} is not JSON.`);
    }

    throw new Error(errorMessage);
  }

  // If the response is OK, parse and return the JSON data
  try {
    return (await res.json()) as T;
  } catch {
    console.info(`Response from ${endpoint} is not JSON. Returning as text.`);
    return (await res.text()) as T;
  }
};
