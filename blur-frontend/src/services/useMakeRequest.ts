import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { ApiResponse } from "../models/api-response";

export const useMakeRequest = <T>(
  request: (...args: string[]) => Promise<ApiResponse<T>>,
  ...args: string[]
) => {
  const [value, setValue] = useState<T | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  console.log("call on useMakeRequest");
  useEffect(() => {
    let isMounted = true;
    console.log("useEffect in useMakeRequest");
    const getPosts = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await request(accessToken, ...args);

      if (!isMounted) {
        return;
      }

      if (data) {
        setValue(data);
      }

      if (error) {
        console.error(error);
      }
    };

    getPosts();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, request, ...args]);

  return value;
};
