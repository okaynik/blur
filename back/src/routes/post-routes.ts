import postService from '@services/post-service';
// import {IPost} from '@models/Post';
import { IReq, IRes } from '@declarations/types';
import HttpStatusCodes from '@configurations/HttpStatusCodes';


const paths = {
    basePath: '/posts',
    get: '/all',
    topViews:'/topviews',
    getOne: '/getone/:id',
    add:'/add'
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

async function add(req: IReq<{title: string, body: string, author: string}>, res: IRes){
  console.log(req.body);
  // console.log(req.params.body);
  const title = req.body.author;
  const body = req.body.body;
  const author = req.body.author;
  await postService.add(title, body, author);

  return res.status(HttpStatusCodes.CREATED).end();

}


  export default {
    paths,
    getAll,
    topViews,
    getOne,
    add,
  } as const;