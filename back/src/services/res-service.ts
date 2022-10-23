import {IResponse} from "@models/Response"
import resRepo from '@repos/res-repo';

function getAll(id: string): Promise<IResponse[] | null>{
    return resRepo.getAll(id);
}

async function add(author: string, postId: string, body: string): Promise<void>{
    return resRepo.add(author, postId, body);
}
export default {
    getAll,
    add,
} as const;