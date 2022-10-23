import postService from '@services/post-service';
// import {IPost} from '@models/Post';
import { IReq, IRes } from '@declarations/types';
import HttpStatusCodes from '@configurations/HttpStatusCodes';


const paths = {
    basePath: '/posts',
    get: '/all',
    topViews:'/topviews'
} as const;

async function getAll(_: IReq, res: IRes) {
    const posts = await postService.getAll();
    return res.status(HttpStatusCodes.OK).json({ posts });
  }

async function topViews(_: IReq, res: IRes) {
  const posts = await postService.topViews();
  return res.status(HttpStatusCodes.OK).json({ posts });
}

  export default {
    paths,
    getAll,
    topViews,
  } as const;