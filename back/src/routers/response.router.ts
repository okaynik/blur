import responseService from "../services/responses.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

export const responsesRouter = express.Router();

responsesRouter.get("/getall/:id", validateAccessToken, async (req, res) => {
  const username = req.auth?.payload.nickname as string;
  const responses = await responseService.getAll(req.params.id, username);
  res.status(200).json(responses);
});

responsesRouter.post("/add", validateAccessToken, async (req, res) => {
  const postId = req.body.postId;
  const author = req.body.author;
  const body = req.body.body;
  await responseService.add(postId, author, body);

  res.status(201).end();
});
