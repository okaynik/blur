import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { Post } from "../models/post";
import { Response } from "../models/response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getTopPosts = async (
  accessToken: string
): Promise<ApiResponse<Post[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/posts/topviews`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data: data as Post[],
    error,
  };
};

export const getPost = async (
  accessToken: string,
  id: string
): Promise<ApiResponse<Post>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/posts/getone/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as ApiResponse<Post>;

  return {
    data,
    error,
  };
};

export const createPost = async (
  accessToken: string,
  title: string,
  body: string,
  author: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/posts/add`,
    method: "POST",
    data: {
      title,
      body,
      author,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getResponses = async (
  accessToken: string,
  id: string
): Promise<ApiResponse<Response[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/responses/getall/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<
    Response[]
  >;

  return {
    data: data as Response[],
    error,
  };
};
