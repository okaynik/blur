import { AxiosRequestConfig } from "axios";
import { ApiResponse, PostId } from "../models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const resendVerification = async (
  accessToken: string,
  userId: string
): Promise<ApiResponse<any>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/auth/email-verify`,
    method: "POST",
    data: {
      user_id: userId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as ApiResponse<PostId>;

  return {
    data,
    error,
  };
};
