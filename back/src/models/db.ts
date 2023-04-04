import * as dotenv from "dotenv";

dotenv.config();
const COCKROACHDB = process.env.COCKROACHDB;
export const Sequelize = require("sequelize-cockroachdb");
export const sequelize = new Sequelize(COCKROACHDB, {
  dialectOptions: {
    application_name: "blur",
  },
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
