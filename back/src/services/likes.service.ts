import { Like, Vote } from "../models/like.model";
import { Post } from "../models/post.model";

const { post, like } = require("../models/db");

async function add(
  postId: string,
  nickname: string,
  vote: Vote
): Promise<void> {
  return post.increment("likes", {
    by: vote === "up" ? 1 : -1,
    where: {
      id: postId,
    },
  });
}

export default {
  add,
} as const;
