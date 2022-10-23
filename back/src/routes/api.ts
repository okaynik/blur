import { Router } from "express";

import adminMw from "./middlware/adminMw";
import validate from "./middlware/validate";
import User from "@models/User";

import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import postRoutes from "./post-routes";
import resRoutes from "./res-routes";

// **** Init **** //

const apiRouter = Router();

// **** Setup auth routes **** //

const authRouter = Router();

// Login user
authRouter.post(
  authRoutes.paths.login,
  validate("email", "password"),
  authRoutes.login
);

// Logout user
authRouter.get(authRoutes.paths.logout, authRoutes.logout);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);

// **** Setup user routes **** //

const userRouter = Router();

// Get all users
userRouter.get(userRoutes.paths.get, userRoutes.getAll);

// Add one user
userRouter.post(
  userRoutes.paths.add,
  validate(["user", User.instanceOf]),
  userRoutes.add
);

// Update one user
userRouter.put(
  userRoutes.paths.update,
  validate(["user", User.instanceOf]),
  userRoutes.update
);

// Delete one user
userRouter.delete(
  userRoutes.paths.delete,
  validate(["id", "number", "params"]),
  userRoutes.delete
);

// Add userRouter
apiRouter.use(userRoutes.paths.basePath, userRouter);

// post router
const postRouter = Router();

postRouter.get(postRoutes.paths.get, postRoutes.getAll);
postRouter.get(postRoutes.paths.topViews, postRoutes.topViews);
postRouter.get(postRoutes.paths.getOne, postRoutes.getOne);

apiRouter.use(postRoutes.paths.basePath, postRouter);

// response router
const resRouter = Router();
resRouter.get(resRoutes.paths.getAll, resRoutes.getAll);
resRouter.post(resRoutes.paths.add, resRoutes.add);
apiRouter.use(resRoutes.paths.basePath, resRouter);
// **** Export default **** //

export default apiRouter;
