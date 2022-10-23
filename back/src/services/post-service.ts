import postRepo from '@repos/post-repo';
import {IPost} from '@models/Post';

function getAll(): Promise<IPost[]> {
    return postRepo.getAll();
}

function topViews(): Promise<IPost[]> {
    return postRepo.topViews();
}

export default {
    getAll,
    topViews,
} as const;