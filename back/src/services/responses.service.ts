import { Response } from "../models/response.model";
import { Comment } from "../models/comment.model";

const { response, responseVote, responseComment, Op } = require("../models/db");

async function getAll(id: string, username: string, page: number): Promise<Response[]> {
  const limitPerPage = 10;
  const offset = (page - 1) * limitPerPage;
  return response
    .findAll({
      where: {
        postId: id,
      },
      order: [
        ["likes", "DESC"],
        ["createdAt", "DESC"]
      ],
      offset: offset,
      limit: limitPerPage,
      include: [
        {
          model: responseVote,
          required: false,
          where: {
            username: username,
          },
        },
        {
          model: responseComment,
          required: false,
          where: {
            responseId: { [Op.col]: "response.id" },
          },
          order: [["createdAt", "ASC"]],
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
            numComments: response.response_comments.length,
            comments: response.response_comments
              .map(
                (comment: any) =>
                  ({
                    id: comment.id,
                    body: comment.body,
                    username: comment.username,
                    createdAt: comment.createdAt,
                  } as Comment)
              )
              .slice(0, 2),
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
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

async function getComments(id: string): Promise<Response[]> {
  return responseComment
    .findAll({
      where: {
        responseId: id,
      },
      order: [["createdAt", "ASC"]],
    })
    .then((comments: any) => {
      return comments.map(
        (comment: any) =>
          ({
            id: comment.id,
            body: comment.body,
            username: comment.username,
            createdAt: comment.createdAt,
          } as Comment)
      );
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

async function addComment(
  responseId: string,
  username: string,
  body: string
): Promise<void> {
  return responseComment
    .create({ body: body, responseId: responseId, username: username })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

export default {
  getAll,
  add,
  getComments,
  addComment,
} as const;
