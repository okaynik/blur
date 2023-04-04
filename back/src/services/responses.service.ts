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
    .then(() =>
      Response.findAll({
        where: {
          postId: id,
        },
        order: [["likes", "DESC"]],
      })
    )
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
  return Response.sync({ force: false }).then(() => {
    return Response.create({ body: body, postId: postId, author: author })
      .then((response: Response) => {
        console.log(response);
      })
      .catch((err: any) => {
        console.log(err);
        return null;
      });
  });
}

export default {
  getAll,
  add,
} as const;
