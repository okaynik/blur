import {IResponse} from "@models/Response"

const Sequelize = require("sequelize-cockroachdb");
const sequelize = new Sequelize("postgresql://waka:WuiwJDk2iDozLmQBmvLhPQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dblur-edu-6053", {
  dialectOptions: {
    application_name: "blur",
  },
});

const Response = sequelize.define("Response", {
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
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

async function getAll(id: string):Promise<IResponse[]>{
    return Response.sync({ force: false })
    .then(() => Response.findAll())
    .then((responses: IResponse[]) => {
        let collect_posts: IResponse[] = [];
      for (const res of responses) {
        console.log(res.postId);
        console.log(id);
        console.log("----------------");
        // console.log(res.createdAt)
        if (res.postId === id) {
          collect_posts.push(res)
        }
      }

      console.log("finished");
      console.log(collect_posts.length);
      // console.log(collect_posts)

      collect_posts.sort(function (a, b) {
        return b.likes - a.likes;
      })

      console.log('cmon man')
      return collect_posts;
    })
    .catch((err: any) => {
      return null;
    });
}

export default {
  getAll,
} as const;
