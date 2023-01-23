import postService from "../services/posts.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

export const postsRouter = express.Router();

postsRouter.get("/getall", validateAccessToken, async (req, res) => {
  const posts = await postService.getAll();
  res.status(200).json(posts);
});

postsRouter.get("/topviews", validateAccessToken, async (req, res) => {
  const posts = await postService.topViews();
  res.status(200).json(posts);
});

postsRouter.get("/getone/:id", validateAccessToken, async (req, res) => {
  const post = await postService.getOne(req.params.id);
  res.status(200).json(post);
});

postsRouter.post("/add", validateAccessToken, async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  console.log(title, body, author);
  //   await postService.add(title, body, author);

  res.status(201).end();
});
