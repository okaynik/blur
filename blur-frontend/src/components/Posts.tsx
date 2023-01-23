import { useEffect, useState } from "react";
import posts_data from "../media/mockPosts.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Posts.css";
import mockPosts from "../media/mockPosts.json"
import * as React from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Post } from "../pages/Main";
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


interface Post {
  id: number;
  likes: number;
  username: string;
  title: string;
  ans: string;
}

// const posts: Post[] = posts_data.questions;

const Posts: React.FC = () => {
  const [posts, setLikes] = useState(posts_data.questions);

  const handleLike = (id:number, like:boolean) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id){
        if (like){
          return {...post, likes: post.likes+1};
        }
        else{
          return {...post, likes: post.likes-1};
        }
      }
      return post;
    });
    setLikes(updatedPosts);
  }

  return (
    <div>
      {posts.map(post=>(
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.username}: {post.ans}</p>
          <button onClick={() => handleLike(post.id, true)}>
          <FontAwesomeIcon icon={faChevronUp} color="" /> 
           {post.likes}
          </button>
          <button onClick={() => handleLike(post.id, false)}>
          <FontAwesomeIcon icon={faChevronDown} color="blue" /> 
            
          </button>
        </div>
        
      ))}
    </div>
  )
}

export default Posts;
