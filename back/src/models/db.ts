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

const postVote = sequelize.define("post_votes", {
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  vote: {
    type: Sequelize.ENUM("up", "down"),
    allowNull: false,
  },
});

const responseVote = sequelize.define("response_votes", {
  responseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  vote: {
    type: Sequelize.ENUM("up", "down"),
    allowNull: false,
  },
});

post.hasMany(response, { foreignKey: "postId" });
post.hasMany(postVote, { foreignKey: "postId" });

response.belongsTo(post, { foreignKey: "postId" });
postVote.belongsTo(post, { foreignKey: "postId" });

response.hasMany(responseVote, { foreignKey: "responseId" });
responseVote.belongsTo(response, { foreignKey: "responseId" });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.response = response;
db.responseVote = responseVote;
db.post = post;
db.postVote = postVote;
db.Op = Op;

module.exports = db;
