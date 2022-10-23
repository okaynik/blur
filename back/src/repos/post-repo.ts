import { IPost } from "@models/Post";

const Sequelize = require("sequelize-cockroachdb");
const sequelize = new Sequelize("postgresql://waka:WuiwJDk2iDozLmQBmvLhPQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dblur-edu-6053", {
  dialectOptions: {
    application_name: "blur",
  },
});

const Post = sequelize.define("Post", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

async function getAll(): Promise<IPost[]> {

    return Post.sync({ force: false })
      .then(() => Post.findAll())
      .then((posts: IPost[]) => {
        console.log(posts);
        return posts;
    });
}

async function topViews(): Promise<IPost[]>{
    return Post.sync({ force: false })
    .then(() => Post.findAll())
    .then((posts: IPost[]) => {
        posts.sort(function(a,b){
            return b.views - a.views
        })
        console.log(posts)
      return posts;
  }); 
}

//get one response
async function getOne(id: string): Promise<IPost | null>{
    return Post.sync({ force: false })
    .then(() => Post.findAll())
    .then((posts: IPost[]) => {
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

export default {
    getAll,
    topViews,
    getOne,
} as const;