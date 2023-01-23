import { AppError } from "./app-error";
import { Message } from "./message";
import { Post } from "./post";

export interface ApiResponse {
  data: Post[] | null;
  error: AppError | null;
}
