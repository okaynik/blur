import postRepo from '@repos/post-repo';
import {IPost} from '@models/Post';

async function getAll(): Promise<IPost[]> {
    return postRepo.getAll();
}

async function topViews(): Promise<IPost[]> {
    return postRepo.topViews();
}

async function getOne(id: string): Promise<IPost | null>{
    return postRepo.getOne(id);
}

export default {
    getAll,
    topViews,
    getOne,
} as const;