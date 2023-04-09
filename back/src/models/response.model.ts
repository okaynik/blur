import { Vote } from "./like.model";

export interface Response {
  id: number;
  body: string;
  author: string;
  likes: number;
  createdAt: string;
  postId: string;
  vote: Vote | null;
}
