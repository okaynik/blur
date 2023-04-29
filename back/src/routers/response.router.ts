import responseService from "../services/responses.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

export const responsesRouter = express.Router();

responsesRouter.get("/getall/:id", validateAccessToken, async (req, res) => {
  const username = req.auth?.payload.username as string;
  const pageNum = Number(req.query.page)
  const responses = await responseService.getAll(req.params.id, username, pageNum);
  res.status(200).json(responses);
});

responsesRouter.post("/add", validateAccessToken, async (req, res) => {
  const postId = req.body.postId;
  const author = req.body.author;
  const body = req.body.body;
  await responseService
    .add(postId, author, body)
    .then(() => {
      res.status(201).end();
    })
    .catch((err) => {
      res.status(403).json({ message: err });
    });
});

responsesRouter.get(
  "/getcomments/:id",
  validateAccessToken,
  async (req, res) => {
    const responses = await responseService.getComments(req.params.id);
    res.status(200).json(responses);
  }
);

responsesRouter.post("/addcomment", validateAccessToken, async (req, res) => {
  const responseId = req.body.responseId;
  const username = req.body.username;
  const body = req.body.body;
  await responseService
    .addComment(responseId, username, body)
    .then(() => {
      res.status(201).end();
    })
    .catch((err) => {
      res.status(403).json({ message: err });
    });
});
