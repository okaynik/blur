import { Vote } from "./like.model";

export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  likes: number;
  views: number;
  time: string;
  vote: Vote | null;
}
