import axios, { Method } from "axios";

const BASE_API_URL: string = process.env.apiUrl || "";

// API's functions
async function handleRequest<T>(
  method: Method,
  url: string,
  data: object | null
): Promise<T> {
  try {
    const response = await axios.request<T>({
      method,
      url: `${BASE_API_URL}${url}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function handleGeneralReq(
  apiUrl: string,
  method: Method = "GET",
  data: object | null = null
) {
  try {
    const response = await handleRequest(method, apiUrl, data);

    return response;
  } catch (error) {
    throw error;
  }
}
