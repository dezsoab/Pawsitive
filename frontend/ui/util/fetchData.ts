const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // for testing only

export const fetchData = async (url: string) => {
  try {
    // await delay(5000);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch response was not ok");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};