import { Like, Vote } from "../models/like.model";
import { Post } from "../models/post.model";

const { post, like } = require("../models/db");

async function add(
  postId: string,
  nickname: string,
  vote: Vote
): Promise<void> {

  const postInstance = await post.findByPk(postId);
  const [existingLike, created] = await like.findOrCreate({
    where: {
      postId: postId,
      nickname: nickname,
    },
    defaults: {
      vote: vote,
    },
  });

  if (created){
    // user havent liked or disliked the post yet
    await postInstance.increment("likes", {
      by: vote === "up" ? 1 : -1,
    });

  } else {

    // user has already liked or disliked the post
    console.log('Row already exists:', existingLike.toJSON());
    if (existingLike.vote === vote) {

      // user is trying to like or dislike the post again, so we remove the like or dislike
      await postInstance.increment("likes", {
        by: vote === "up" ? -1 : 1,
      });

      await existingLike.destroy();

    }

    else {
      // user is trying to change his like or dislike
      await postInstance.increment("likes", {
        by: vote === "up" ? 2 : -2,
      });

      await existingLike.update({
        vote: vote,
      });
    }

  }

}

export default {
  add,
} as const;
