import { ApiResponse } from "../models/api-response";

export const makeRequestFunction = async <T>(
    request: (accessToken: string, pageNumber: string, query?: string) => Promise<ApiResponse<T>>,
    accessToken: string | null,
    pageNumber: string,
    query?: string
  ): Promise<T | null> => {
    const { data, error } = await request(accessToken || '', pageNumber, query); // Pass accessToken, query, and pageNumber as arguments
  
    if (data) {
      return data;
    }
  
    if (error) {
      console.error(error);
    }
  
    return null;
  };
  