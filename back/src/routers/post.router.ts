import postService from "../services/posts.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

export const postsRouter = express.Router();

postsRouter.get("/topviews", validateAccessToken, async (req, res) => {
  const username = req.auth?.payload.nickname as string;
  if (!username) {
    res.status(400).json({ error: "Username not provided" });
    return;
  }
  const posts = await postService.topViews(username);
  res.status(200).json(posts);
});

postsRouter.get("/getone/:id", validateAccessToken, async (req, res) => {
  const username = req.auth?.payload.nickname as string;
  if (!username) {
    res.status(400).json({ error: "Username not provided" });
    return;
  }
  const post = await postService.getOne(req.params.id, username);
  res.status(200).json(post);
});

postsRouter.post("/add", validateAccessToken, async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  const id = await postService.add(title, body, author);
  res.status(201).json({ id: id });
});

postsRouter.get("/search/:query", validateAccessToken, async (req, res) => {
  const query = req.params.query;
  const username = req.auth?.payload.nickname as string;
  if (!username) {
    res.status(400).json({ error: "Username not provided" });
    return;
  }
  const posts = await postService.search(query, username);
  res.status(200).json(posts);
});
