import responseService from "../services/responses.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

export const responsesRouter = express.Router();

responsesRouter.get("/getall/:id", validateAccessToken, async (req, res) => {
  console.log(req.params.id);
  const responses = await responseService.getAll(req.params.id);
  res.status(200).json(responses);
});

responsesRouter.post("/add", validateAccessToken, async (req, res) => {
  const author = req.body.author;
  const postId = req.body.postId;
  const body = req.body.body;
  console.log(author, postId, body);
  //   await postService.add(title, body, author);

  res.status(201).end();
});
