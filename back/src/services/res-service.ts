import {IResponse} from "@models/Response"
import resRepo from '@repos/res-repo';

function getAll(id: string): Promise<IResponse[] | null>{
    return resRepo.getAll(id);
}

export default {
    getAll,
} as const;