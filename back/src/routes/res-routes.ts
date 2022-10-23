import HttpStatusCodes from '@configurations/HttpStatusCodes';

import resService from '@services/res-service';
import { IResponse } from '@models/Response';
import { IReq, IRes } from '@declarations/types';

// Paths
const paths = {
    basePath: '/res',
    getAll: '/getall/:id',
    add:'/add/:author/:postid/:body',
  } as const;


async function getAll(req: IReq, res: IRes) {
  console.log(req.params.id);
  const responses = await resService.getAll(req.params.id);

  return res.status(HttpStatusCodes.OK).json({ responses });
}

async function add(req: IReq, res: IRes){
  console.log(req.params);
  // console.log(req.params.body);
  const author = req.params.author;
  const body = req.params.body;
  const postId = req.params.postid;
  await resService.add(author, postId, body);

  return res.status(HttpStatusCodes.CREATED).end();

}

export default {
    paths,
    getAll,
    add,
  } as const;