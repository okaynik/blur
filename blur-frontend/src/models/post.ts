import { Vote } from "./vote";
export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  likes: number;
  views: number;
  time: string;
  createdAt: Date;
  vote: Vote;
}
