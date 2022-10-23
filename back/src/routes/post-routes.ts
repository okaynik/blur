import postService from '@services/post-service';
// import {IPost} from '@models/Post';
import { IReq, IRes } from '@declarations/types';
import HttpStatusCodes from '@configurations/HttpStatusCodes';


const paths = {
    basePath: '/posts',
    get: '/all',
    topViews:'/topviews',
    getOne: '/getone/:id'
} as const;

async function getAll(_: IReq, res: IRes) {
    const posts = await postService.getAll();
    return res.status(HttpStatusCodes.OK).json({ posts });
  }

async function topViews(_: IReq, res: IRes) {
  const posts = await postService.topViews();
  return res.status(HttpStatusCodes.OK).json({ posts });
}

async function getOne(req: IReq, res: IRes) {
  console.log(req.params.id);
  const post = await postService.getOne(req.params.id);
  return res.status(HttpStatusCodes.OK).json({ post });
}


  export default {
    paths,
    getAll,
    topViews,
    getOne,
  } as const;