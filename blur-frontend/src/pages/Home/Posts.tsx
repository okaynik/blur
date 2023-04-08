import { useState } from "react";
import "../../styles/Posts.css";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  getTopPosts,
  searchPosts,
  likePost,
} from "../../services/posts.service";
import { useMakeRequest } from "../../services/useMakeRequest";
import { Post } from "../../models/post";
import { PageLoader } from "../../components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import { VoteButtons } from "../../components/VoteButtons";
import { Vote } from "../../models/vote";
interface Props {
  query: string | undefined;
}

const Posts: React.FC<Props> = ({ query }: Props) => {
  const { user, getAccessTokenSilently } = useAuth0();

  const posts = query
    ? useMakeRequest<Post[]>(searchPosts, query)
    : useMakeRequest<Post[]>(getTopPosts);

  const handleVote = async (id: number, vote: Vote) => {
    console.log(id, vote)
    if (!user?.nickname) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.nickname, vote);
  };

  if (!posts) {
    return <PageLoader />;
  }

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      {posts?.map((post) => (
        <div className="post" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
            <p>
              <span className="author">{post.author}:</span>{" "}
              {post.body.length > 280
                ? post.body.slice(0, 280) + "..."
                : post.body}
            </p>
          </Link>
          <VoteButtons 
            onVote={handleVote} 
            id={post.id} 
            likes={post.likes}
            activeVote = {post.vote}  />
        </div>
      ))}
    </div>
  );
};

export default Posts;

