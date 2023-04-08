import { Post } from "../models/post.model";

const { post, Op, like } = require("../models/db");

async function topViews(username:string): Promise<Post[]> {
  console.log("topViews", post);

  return post
    .findAll({
      order: [["views", "DESC"]],
      limit: 10,
    })
    .then((posts: Post[]) => {
      return posts;
    });
}

async function getOne(id: string): Promise<Post | null> {
  return post
    .findAll({
      where: {
        id: id,
      },
    })
    .then((posts: Post[]) => {
      return posts[0];
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

async function add(
  title: string,
  body: string,
  author: string
): Promise<number> {
  return post
    .create({ body: body, title: title, author: author })
    .then((post: Post) => {
      return post.id;
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

async function search(query: string): Promise<Post[]> {
  return post
    .findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { body: { [Op.iLike]: `%${query}%` } },
        ],
      },
    })
    .then((posts: Post[]) => {
      return posts;
    });
}

export default {
  topViews,
  getOne,
  add,
  search,
} as const;
