import { Vote } from "./like.model";
import { Comment } from "./comment.model";

export interface Response {
  id: number;
  body: string;
  author: string;
  likes: number;
  createdAt: string;
  postId: string;
  vote: Vote | null;
  comments: Comment[];
  numComments: number;
}
