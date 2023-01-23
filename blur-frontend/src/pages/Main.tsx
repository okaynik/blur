import TopBar from "../components/TopBar";
import Posts from "../components/Posts";
import "../styles/Main.css";
import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

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
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const submitPost = () => {
    fetch("http://localhost:9000/api/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "applicati   on/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        author: "spicyshrimp",
      }),
    });
    setIsEditing(false);
  };


  return (
     <div>
      <TopBar />
      {/* <p>Hello {user}</p> */}
      <div className="Header mt-3 ml-2">
        <h1> {isEditing ? "Create new post" : "Top Posts"}</h1>
        <button className="btn btn-dark" onClick={handleEdit}>
          {isEditing ? "Cancel" : "New Post"}
        </button>

      </div>

      {isEditing && (
        <div className="Create-box">
          <div className="Create form-group mt-3">
            <label>Title</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control mt-1"
              placeholder="Enter your post here"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="ButtonGroup">
            <button className="btn btn-dark" onClick={submitPost}>
              Submit
            </button>
          </div>
        </div>
      )}
      {!isEditing && <Posts />}
    </div>
  );
}
