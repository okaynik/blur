import { Response } from "../models/response.model";

const { response, responseVote } = require("../models/db");

async function getAll(id: string, username: string): Promise<Response[]> {
  return response
    .findAll({
      where: {
        postId: id,
      },
      order: [["likes", "DESC"]],
      include: [
        {
          model: responseVote,
          required: false,
          where: {
            username: username,
          },
        },
      ],
    })
    .then((responses: any) => {
      return responses.map(
        (response: any) =>
          ({
            id: response.id,
            body: response.body,
            author: response.author,
            likes: response.likes,
            createdAt: response.createdAt,
            postId: response.postId,
            vote: response.response_votes[0]
              ? response.response_votes[0].vote
              : null,
          } as Response)
      );
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

async function add(
  postId: string,
  author: string,
  body: string
): Promise<void> {
  return response
    .create({ body: body, postId: postId, author: author })
    .then((response: Response) => {
      console.log(response);
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

export default {
  getAll,
  add,
} as const;
