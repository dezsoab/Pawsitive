type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
  headers: Headers;
  redirected: boolean;
  statusText: string;
  type: ResponseType;
  url: string;
  clone: () => MockResponse;
  body: null;
  bodyUsed: boolean;
  arrayBuffer: () => Promise<ArrayBuffer>;
  blob: () => Promise<Blob>;
  formData: () => Promise<FormData>;
  text: () => Promise<string>;
};

export const mockFetchResponse = (data: any): MockResponse => {
  return {
    ok: true,
    status: 200,
    json: async () => data,
    headers: new Headers(),
    redirected: false,
    statusText: "OK",
    type: "basic",
    url: "",
    clone: () => mockFetchResponse(data),
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => JSON.stringify(data),
  };
};