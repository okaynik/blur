import { Response } from "../models/response.model";
import * as dotenv from "dotenv";

dotenv.config();
const COCKROACHDB = process.env.COCKROACHDB;
const Sequelize = require("sequelize-cockroachdb");
const sequelize = new Sequelize(COCKROACHDB, {
  dialectOptions: {
    application_name: "blur",
  },
});

const Response = sequelize.define("response", {
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
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

async function getAll(id: string): Promise<Response[]> {
  return Response.sync({ force: false })
    .then(() => Response.findAll())
    .then((responses: Response[]) => {
      let collect_posts: Response[] = [];
      for (const res of responses) {
        if (res.postId === id) {
          collect_posts.push(res);
        }
      }

      collect_posts.sort(function (a, b) {
        return a.likes === b.likes
          ? b.createdAt < a.createdAt
            ? -1
            : 0
          : b.likes - a.likes;
      });
      return collect_posts;
    })
    .catch((err: any) => {
      return null;
    });
}

async function add(
  author: string,
  postId: string,
  body: string
): Promise<void> {
  return Response.sync({ force: false }).then(() => {
    console.log(author, postId, body);
    Response.create({ body: body, postId: postId, author: author });
    console.log("completed");
  });
}
export default {
  getAll,
  add,
} as const;
