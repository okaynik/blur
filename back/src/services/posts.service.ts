import { Post } from "../models/post.model";
import * as dotenv from "dotenv";

dotenv.config();
const COCKROACHDB = process.env.COCKROACHDB;
const Sequelize = require("sequelize-cockroachdb");
const { Op } = require("sequelize");
const sequelize = new Sequelize(COCKROACHDB, {
  dialectOptions: {
    application_name: "blur",
  },
});

const Post = sequelize.define("post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  views: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

async function getAll(): Promise<Post[]> {
  return Post.sync({ force: false })
    .then(() => Post.findAll())
    .then((posts: Post[]) => {
      return posts;
    });
}

async function topViews(): Promise<Post[]> {
  return Post.sync({ force: false })
    .then(() =>
      Post.findAll({
        order: [["views", "DESC"]],
        limit: 10,
      })
    )
    .then((posts: Post[]) => {
      return posts;
    });
}

async function getOne(id: string): Promise<Post | null> {
  return Post.sync({ force: false })
    .then(() =>
      Post.findAll({
        where: {
          id: id,
        },
      })
    )
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
  return Post.sync({ force: false }).then(() => {
    return Post.create({ body: body, title: title, author: author })
      .then((post: Post) => {
        return post.id;
      })
      .catch((err: any) => {
        console.log(err);
        return null;
      });
  });
}

async function search(query: string): Promise<Post[]> {
  return Post.sync({ force: false })
    .then(() =>
      Post.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { body: { [Op.iLike]: `%${query}%` } },
          ],
        },
      })
    )
    .then((posts: Post[]) => {
      return posts;
    });
}

export default {
  getAll,
  topViews,
  getOne,
  add,
  search,
} as const;
