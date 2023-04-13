import { AppError } from "./app-error";
import { Post } from "./post";
import { Response } from "./response";
import { Comment } from "./comment";

export interface ApiResponse<
  T = Post | Post[] | Response[] | PostId | Comment[]
> {
  data: T | null;
  error: AppError | null;
}

export interface PostId {
  id: number;
}
