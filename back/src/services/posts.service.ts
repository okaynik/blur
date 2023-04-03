import { Post } from "../models/post.model";
import * as dotenv from "dotenv";

dotenv.config();
const COCKROACHDB = process.env.COCKROACHDB;
const Sequelize = require("sequelize-cockroachdb");
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
      console.log(posts);
      return posts;
    });
}

async function topViews(): Promise<Post[]> {
  return Post.sync({ force: false })
    .then(() => Post.findAll())
    .then((posts: Post[]) => {
      posts.sort(function (a, b) {
        return b.views - a.views;
      });
      console.log(posts);
      return posts;
    });
}

//get one post by id
async function getOne(id: string): Promise<Post | null> {
  return Post.sync({ force: false })
    .then(() => Post.findAll())
    .then((posts: Post[]) => {
      for (const post of posts) {
        console.log(post.id);
        console.log(id);
        if (post.id.toString() === id) {
          return post;
        }
      }
    })
    .catch((err: any) => {
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
    .then(() => Post.findAll())
    .then((posts: Post[]) => {
      const results: Post[] = [];
      for (const post of posts) {
        if (post.title.toLowerCase().includes(query.toLowerCase())) {
          results.push(post);
        }
      }
      return results;
    });
}

export default {
  getAll,
  topViews,
  getOne,
  add,
  search,
} as const;
