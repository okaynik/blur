import { Response } from "../models/response.model";

const { response } = require("../models/db");

async function getAll(id: string): Promise<Response[]> {
  return response
    .findAll({
      where: {
        postId: id,
      },
      order: [["likes", "DESC"]],
    })
    .then((responses: Response[]) => {
      return responses;
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
