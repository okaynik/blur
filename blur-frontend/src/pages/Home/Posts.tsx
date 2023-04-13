import { useState, useEffect } from "react";
import "../../styles/Posts.css";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
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
import ReactTimeAgo from "react-time-ago";

interface Props {
  query: string | undefined;
}

const Posts: React.FC<Props> = ({ query }: Props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false); // Added state for loading animation

  const posts = query
    ? useMakeRequest<Post[]>(searchPosts, query)
    : useMakeRequest<Post[]>(getTopPosts, pageNumber.toString());

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollSum = scrollTop + clientHeight;

    // console.log({ scrollTop, scrollHeight, clientHeight, "scrollSum": scrollSum })
    //log scrollTop + scrollHeight

    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      // User has scrolled to the bottom of the page
      // console.log("bottom")
      // console.log("page number", pageNumber)
      setLoading(true); // Set loading state to true
      // console.log('loading set to true');
      // Add a delay of 500ms before invoking handleLoadMore
      handleLoadMore();
    }
  };

  const handleLoadMore = () => {
    setLoading(false); // Set loading state to false after loading
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNumber]); // Empty dependency array to ensure effect runs only on mount and unmount

  useEffect(() => {
    setPageNumber(1);
  }, [query]);

  const handleVote = async (id: number, vote: Vote) => {
    if (!user?.username) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.username, vote, "post");
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
            <div className="post-title">
              <h2>{post.title}</h2>
            </div>
            <p>
              <span className="author">{post.author}:</span>{" "}
              {post.body.length > 280
                ? post.body.slice(0, 280) + "..."
                : post.body}
            </p>
          </Link>
          <div className="bottom-post">
            <VoteButtons
              onVote={handleVote}
              id={post.id}
              likes={post.likes}
              activeVote={post.vote}
            />
            <div className="post-info">
              <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
              <div className="post-views">
                {post.views}
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
          </div>
        </div>
      ))}
      {loading && <PageLoader />}{" "}
      {/* Render loading message while loading is true */}
    </div>
  );
};

export default Posts;
