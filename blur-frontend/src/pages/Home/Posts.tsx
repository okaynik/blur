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
import { Post_Preview } from "../../models/post_preview";
import { PageLoader } from "../../components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  query: string | undefined;
}

const Posts: React.FC<Props> = ({ query }: Props) => {
  const [posts, setLikes] = useState<Post_Preview[]>([]);
  const { user, getAccessTokenSilently } = useAuth0();

  const value = query
    ? useMakeRequest<Post[]>(searchPosts, query)
    : useMakeRequest<Post[]>(getTopPosts);

  const handleLike = async (id: number, vote: "up" | "down") => {
    if (!user?.nickname) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.nickname, vote);
  };

  if (!value) {
    return <PageLoader />;
  }

  if (value.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      {value?.map((post) => (
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
          <button className="upvote" onClick={() => handleLike(post.id, "up")}>
            <FontAwesomeIcon icon={faChevronUp} color="" />
            {post.likes}
          </button>
          <button
            className="downvote"
            onClick={() => handleLike(post.id, "down")}
          >
            <FontAwesomeIcon icon={faChevronDown} color="" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
