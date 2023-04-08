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

interface Props {
  query: string | undefined;
}

const Posts: React.FC<Props> = ({ query }: Props) => {
  const { user, getAccessTokenSilently } = useAuth0();

  const posts = query
    ? useMakeRequest<Post[]>(searchPosts, query)
    : useMakeRequest<Post[]>(getTopPosts);

  const handleVote = async (id: number, vote: Vote) => {
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
          <VoteButtons onVote={handleVote} id={post.id} likes={post.likes} />
        </div>
      ))}
    </div>
  );
};

export default Posts;

type Vote = "up" | "down";
interface VoteProps {
  onVote: (id: number, vote: Vote) => void;
  id: number;
  likes: number;
}

export const VoteButtons: React.FC<VoteProps> = ({
  onVote,
  id,
  likes,
}: VoteProps) => {
  const [activeUp, setActiveUp] = useState(false);
  const [activeDown, setActiveDown] = useState(false);
  const [displayLikes, setDisplayLikes] = useState(likes);

  return (
    <div className="vote-buttons">
      <button
        className={activeUp ? "upvote upvote-active" : "upvote"}
        onClick={() => {
          if (!activeUp) {
            setActiveUp(true);
            if (activeDown) {
              setActiveDown(false);
              setDisplayLikes(displayLikes + 2);
            } else {
              setDisplayLikes(displayLikes + 1);
            }
            onVote(id, "up");
          } else {
            setActiveUp(false);
            setActiveDown(false);
            setDisplayLikes(displayLikes - 1);
            onVote(id, "down");
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <h2>{displayLikes}</h2>
      <button
        className={activeDown ? "downvote downvote-active" : "downvote"}
        onClick={() => {
          if (!activeDown) {
            setActiveDown(true);
            if (activeUp) {
              setActiveUp(false);
              setDisplayLikes(displayLikes - 2);
            } else {
              setDisplayLikes(displayLikes - 1);
            }
            onVote(id, "down");
          } else {
            setActiveDown(false);
            setActiveUp(false);
            setDisplayLikes(displayLikes + 1);
            onVote(id, "up");
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};
