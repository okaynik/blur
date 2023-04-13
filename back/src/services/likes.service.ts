import { Like, Vote } from "../models/like.model";
import { Post } from "../models/post.model";

const { post, postVote, responseVote, response } = require("../models/db");

async function add(
  id: string,
  username: string,
  vote: Vote,
  type: "post" | "response"
): Promise<void> {
  const instance =
    type === "post" ? await post.findByPk(id) : await response.findByPk(id);
  const [existingVote, created] =
    type === "post"
      ? await postVote.findOrCreate({
          where: {
            postId: id,
            username: username,
          },
          defaults: {
            vote: vote,
          },
        })
      : await responseVote.findOrCreate({
          where: {
            responseId: id,
            username: username,
          },
          defaults: {
            vote: vote,
          },
        });

  if (created) {
    // user havent liked or disliked the post yet
    await instance.increment("likes", {
      by: vote === "up" ? 1 : -1,
    });
  } else {
    // user has already liked or disliked the post
    // console.log('Row already exists:', existingLike.toJSON());
    if (existingVote.vote === vote) {
      // user is trying to like or dislike the post again, so we remove the like or dislike
      await instance.increment("likes", {
        by: vote === "up" ? -1 : 1,
      });

      await existingVote.destroy();
    } else {
      // user is trying to change his like or dislike
      await instance.increment("likes", {
        by: vote === "up" ? 2 : -2,
      });

      await existingVote.update({
        vote: vote,
      });
    }
  }
}

export default {
  add,
} as const;
