import TopBar from "./TopBar";
import Posts from "./Posts";
import "./Main.css";

import "bootstrap/dist/css/bootstrap.min.css";

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

export default function Main() {
  return (
    <div>
      <TopBar />
      <div className="Header mt-3 ml-2">
        <h1>Top Posts</h1>
        <button className="btn btn-primary">New Post</button>
      </div>
      <Posts />
    </div>
  );
}
