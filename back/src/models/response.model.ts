import { Vote } from "./like.model";

export interface Response {
  id: number;
  body: string;
  author: string;
  likes: number;
  createdAt: Date;
  postId: string;
  vote: Vote | null;
}
