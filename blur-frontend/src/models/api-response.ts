import { AppError } from "./app-error";
import { Message } from "./message";
import { Post } from "./post";

export interface ApiResponse<T = Post | Post[]> {
  data: T | null;
  error: AppError | null;
}
