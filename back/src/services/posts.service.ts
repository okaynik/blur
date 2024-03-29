import { Post } from "../models/post.model";

const { post, Op, postVote } = require("../models/db");
const filter = require("../models/filter");

async function topViews(username: string, page: number): Promise<Post[]> {
  const limitPerPage = 10;
  const offset = (page - 1) * limitPerPage;

  return post
    .findAll({
      order: [
        ["likes", "DESC"],
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ],
      offset: offset,
      limit: limitPerPage,
      subquery: false,
      include: [
        {
          model: postVote,
          required: false,
          where: {
            username: username,
          },
        },
      ],
    })
    .then((posts: any) => {
      return posts.map(
        (post: any) =>
          ({
            id: post.id,
            title: post.title,
            body: post.body,
            author: post.author,
            likes: post.likes,
            views: post.views,
            createdAt: post.createdAt,
            vote: post.post_votes[0] ? post.post_votes[0].vote : null,
          } as Post)
      );
    })
    .catch((err: any) => {
      return err;
    });
}

async function getOne(id: string, username: string): Promise<Post | null> {
  return post
    .findByPk(id, {
      include: [
        {
          model: postVote,
          required: false,
          where: {
            username: username,
          },
        },
      ],
    })
    .then((post: any) => {
      if (post) {
        post.increment("views", { by: 1 });
        return {
          id: post.id,
          title: post.title,
          body: post.body,
          author: post.author,
          likes: post.likes,
          views: post.views,
          createdAt: post.createdAt,
          vote: post.post_votes[0] ? post.post_votes[0].vote : null,
        };
      } else {
        return null;
      }
    });
}

async function add(
  title: string,
  body: string,
  author: string
): Promise<number> {
  if (filter.isProfane(title) || filter.isProfane(body)) {
    return Promise.reject("Profanity is not allowed.");
  }

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

async function search(
  query: string,
  username: string,
  page: number
): Promise<Post[]> {
  const limitPerPage = 10;
  const offset = (page - 1) * limitPerPage;
  return post
    .findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { body: { [Op.iLike]: `%${query}%` } },
        ],
      },
      order: [
        ["likes", "DESC"],
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ],
      offset: offset,
      limit: limitPerPage,
      include: [
        {
          model: postVote,
          required: false,
          where: {
            username: username,
          },
        },
      ],
    })
    .then((posts: any) => {
      return posts.map(
        (post: any) =>
          ({
            id: post.id,
            title: post.title,
            body: post.body,
            author: post.author,
            likes: post.likes,
            views: post.views,
            createdAt: post.createdAt,
            vote: post.post_votes[0] ? post.post_votes[0].vote : null,
          } as Post)
      );
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
}

async function userPosts(username: string, page: number): Promise<Post[]> {
  const limitPerPage = 10;
  const offset = (page - 1) * limitPerPage;
  return post
    .findAll({
      where: {
        author: username,
      },
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: limitPerPage,
    })
    .then((posts: any) => {
      return posts;
    });
}

export default {
  topViews,
  getOne,
  add,
  search,
  userPosts,
} as const;
