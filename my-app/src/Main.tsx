import TopBar from "./TopBar"
import Posts from "./Posts"

export interface Post {
    id: number;
    title: string;
    body: string;
    author: string;
    likes: number;
    views: number;
    time: string;
  }

export interface Response {
    id: number;
    body: string;
    author: string;
    likes: number;
    time: string;
    postId: number;
}

export default function Main () {
    return(
        <div>
            <TopBar />
            <Posts />
        </div>
    )
}