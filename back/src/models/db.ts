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

const response = sequelize.define("response", {
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

const post = sequelize.define("post", {
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

const like = sequelize.define("like", {
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vote: {
    type: Sequelize.ENUM("up", "down"),
    allowNull: false,
  },
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.response = response;
db.post = post;
db.like = like;
db.Op = Op;

module.exports = db;
