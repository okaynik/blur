import { IUser } from "@models/User";
import { getRandomInt } from "@declarations/functions";
import orm from "./mock-orm";
require('dotenv').config();


const Sequelize = require("sequelize-cockroachdb");
const sequelize = new Sequelize(
  `postgresql://${process.env.CONNECTION_TOKEN}@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dblur-edu-6053`,
  {
    dialectOptions: {
      application_name: "blur",
    },
  }
);

const User = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pwdHash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | null> {

  return User.sync({ force: false })
    .then(() => User.findAll())
    .then((users: IUser[]) => {
      // console.log(users);
      for (const user of users) {
        if (user.email === email) {
          return user;
        }
      }
    })
    .catch((err: any) => {
      return null;
    });
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  return User.sync({ force: false })
    .then(() => User.findAll())
    .then((users: IUser[]) => {
      // console.log(users);
      return users;
    });
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<void> {
  const db = await orm.openDb();
  user.id = getRandomInt();
  db.users.push(user);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      db.users[i] = user;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function _delete(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: _delete,
} as const;
