import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { ApiResponse } from "../models/api-response";

export const useMakeRequest = <T>(
  request: (...args: string[]) => Promise<ApiResponse<T>>,
  ...args: string[]
) =>
  // request: (...args: (string|number)[]) => Promise<ApiResponse<T>>,
  // ...args: (string|number)[]
  {
    const [value, setValue] = useState<T | null>(null);
    const { user, getAccessTokenSilently } = useAuth0();
    useEffect(() => {
      let isMounted = true;
      const makeRequest = async () => {
        let accessToken = "";
        if (user) {
          accessToken = await getAccessTokenSilently();
        }
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

      makeRequest();
      return () => {
        isMounted = false;
      };
    }, [getAccessTokenSilently, request, ...args]);

    return value;
  };
