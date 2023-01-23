import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";
import postService from "./posts.service";

export const postsRouter = express.Router();

postsRouter.get("/getall", validateAccessToken, async (req, res) => {
  const message = await postService.getAll();
  res.status(200).json(message);
});

// postsRouter.get("/protected", validateAccessToken, (req, res) => {
//   const message = getProtectedMessage();

//   res.status(200).json(message);
// });

// postsRouter.get("/admin", validateAccessToken, (req, res) => {
//   const message = getAdminMessage();

//   res.status(200).json(message);
// });

// import postRepo from '@repos/post-repo';
// import {IPost} from '@models/Post';

// async function getAll(): Promise<IPost[]> {
//     return postRepo.getAll();
// }

// async function topViews(): Promise<IPost[]> {
//     return postRepo.topViews();
// }

// async function getOne(id: string): Promise<IPost | null>{
//     return postRepo.getOne(id);
// }

// async function add(title: string, body: string, aurthor: string): Promise<void>{
//     return postRepo.add(title, body, aurthor);
// }

// export default {
//     getAll,
//     topViews,
//     getOne,
//     add,
// } as const;
