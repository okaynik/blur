import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import BaseRouter from "./routes/api";
import logger from "jet-logger";
import EnvVars from "@configurations/EnvVars";
import HttpStatusCodes from "@configurations/HttpStatusCodes";
import { NodeEnvs } from "@declarations/enums";
import { RouteError } from "@declarations/classes";
import { auth, requiresAuth } from "express-openid-connect";
// import {cors} from "@middlewares/cors";

// **** Init express **** //
const app = express();

var cors = require("cors");
app.use(cors());

// **** Auth0 **** //
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "0vy5dOr5DLAtUQPdRE38DpZAU1R2jWHC",
  issuerBaseURL: "https://dev-l8rj2k42khpaz660.us.auth0.com",
};

app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.cookieProps.secret));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// **** Add API routes **** //

// Add APIs
// app.use("/api", BaseRouter);

// Setup error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    logger.err(err, true);
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);

// **** Serve front-end content **** //

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// // Nav to login pg by default
// app.get("/", (_: Request, res: Response) => {
//   res.sendFile("login.html", { root: viewsDir });
// });

// // Redirect to login if not logged in.
// app.get("/users", (req: Request, res: Response) => {
//   const jwt = req.signedCookies[EnvVars.cookieProps.key];
//   if (!jwt) {
//     res.redirect("/");
//   } else {
//     res.sendFile("users.html", { root: viewsDir });
//   }
// });

// app.use("/api", BaseRouter);
// var testAPIRouter = require("./routes/react-test");
// app.use("/react-test", testAPIRouter);

// **** Export default **** //

export default app;
