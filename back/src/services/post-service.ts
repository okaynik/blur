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

async function add(title: string, body: string, aurthor: string): Promise<void>{
    return postRepo.add(title, body, aurthor);
}

export default {
    getAll,
    topViews,
    getOne,
    add,
} as const;