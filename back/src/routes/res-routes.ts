import HttpStatusCodes from '@configurations/HttpStatusCodes';

import resService from '@services/res-service';
import { IResponse } from '@models/Response';
import { IReq, IRes } from '@declarations/types';

// Paths
const paths = {
    basePath: '/res',
    getAll: '/getall/:id',
  } as const;


async function getAll(req: IReq, res: IRes) {
  console.log(req.params.id);
  const responses = await resService.getAll(req.params.id);

  return res.status(HttpStatusCodes.OK).json({ responses });
}

export default {
    paths,
    getAll,
  } as const;