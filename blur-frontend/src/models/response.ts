import { Vote } from "./vote";

export interface Response {
  id: number;
  body: string;
  author: string;
  likes: number;
  time: string;
  postId: number;
  vote: Vote | null;
}
