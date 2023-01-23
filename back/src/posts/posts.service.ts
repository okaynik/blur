// async function getAll(): Promise<Post[]> {
//   return postRepo.getAll();
// }

// async function topViews(): Promise<Post[]> {
//   return postRepo.topViews();
// }

// async function getOne(id: string): Promise<Post | null> {
//   return postRepo.getOne(id);
// }

// async function add(
//   title: string,
//   body: string,
//   aurthor: string
// ): Promise<void> {
//   return postRepo.add(title, body, aurthor);
// }

// export default {
//   getAll,
//   topViews,
//   getOne,
//   add,
// } as const;

import { Post } from "./post.model";

const Sequelize = require("sequelize-cockroachdb");
const sequelize = new Sequelize(
  "postgresql://waka:WuiwJDk2iDozLmQBmvLhPQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dblur-edu-6053",
  {
    dialectOptions: {
      application_name: "blur",
    },
  }
);

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

//get one response
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

async function add(title: string, body: string, author: string): Promise<void> {
  return Post.sync({ force: false }).then(() => {
    console.log(title, author, body);
    Post.create({ body: body, title: title, author: author });
    console.log("Post Added");
  });
}

export default {
  getAll,
  topViews,
  getOne,
  add,
} as const;
