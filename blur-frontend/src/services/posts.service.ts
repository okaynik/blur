import { AxiosRequestConfig } from "axios";
import { ApiResponse, PostId } from "../models/api-response";
import { Post } from "../models/post";
import { Response } from "../models/response";
import { Comment } from "../models/comment";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getTopPosts = async (
  accessToken: string,
  pageNumber: number
): Promise<ApiResponse<Post[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/posts/topviews?page=${pageNumber}`, // Update URL with page number
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<
    Post[]
  >;

  return {
    data,
    error,
  };
};

export const searchPosts = async (
  accessToken: string,
  query: string,
  pageNumber: number
): Promise<ApiResponse<Post[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/posts/search/${query}?page=${pageNumber}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<
    Post[]
  >;

  return {
    data,
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
): Promise<ApiResponse<number>> => {
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

  const { data, error } = (await callExternalApi({
    config,
  })) as ApiResponse<PostId>;

  return {
    data: data ? data.id : null,
    error,
  };
};

export const getResponses = async (
  accessToken: string,
  id: string,
  pageNumber: number
): Promise<ApiResponse<Response[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/responses/getall/${id}?page=${pageNumber}`,
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
    data,
    error,
  };
};

export const createResponse = async (
  accessToken: string,
  postId: string,
  author: string,
  body: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/responses/add`,
    method: "POST",
    data: {
      postId,
      author,
      body,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const likePost = async (
  accessToken: string,
  postId: string,
  username: string,
  vote: "up" | "down",
  type: "post" | "response"
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/likes/add`,
    method: "POST",
    data: {
      postId,
      username,
      vote,
      type,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getUserPosts = async (
  accessToken: string,
  pageNumber: number
): Promise<ApiResponse<Post[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/posts/userposts?page=${pageNumber}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<
    Post[]
  >;

  return {
    data,
    error,
  };
};

export const createComment = async (
  accessToken: string,
  responseId: string,
  username: string,
  body: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/responses/addcomment`,
    method: "POST",
    data: {
      responseId,
      username,
      body,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getComments = async (
  accessToken: string,
  id: string
): Promise<ApiResponse<Comment[]>> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/responses/getcomments/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse<
    Comment[]
  >;

  return {
    data,
    error,
  };
};


export const deletePost = async (
  accessToken: string,
  postId: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/admin/posts/delete/${postId}`,
    method: "DELETE",
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