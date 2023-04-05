import { AppError } from "./app-error";
import { Post } from "./post";
import { Response } from "./response";

export interface ApiResponse<T = Post | Post[] | Response[] | PostId> {
  data: T | null;
  error: AppError | null;
}

export interface PostId {
  id: number;
}
