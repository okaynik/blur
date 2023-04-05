import likesService from "../services/likes.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

export const likesRouter = express.Router();

likesRouter.post("/add", validateAccessToken, async (req, res) => {
  const postId = req.body.postId;
  const nickname = req.body.nickname;
  const vote = req.body.vote;
  await likesService.add(postId, nickname, vote);

  res.status(201).end();
});
