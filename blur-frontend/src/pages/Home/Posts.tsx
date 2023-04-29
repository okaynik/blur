import { useState,useCallback, useEffect} from "react";
import { AppError } from "../../models/app-error";
import "../../styles/Posts.css";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ApiResponse } from "../../models/api-response";
import {
  getTopPosts,
  searchPosts,
  likePost,
} from "../../services/posts.service";
import { Post } from "../../models/post";
import { useAuth0 } from "@auth0/auth0-react";
import { VoteButtons } from "../../components/VoteButtons";
import { Vote } from "../../models/vote";
import ReactTimeAgo from "react-time-ago";
import  InfiniteScroll  from '../../components/InfiniteScroll';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// import jwt_decode from "jwt-decode";


interface Props {
  query: string | undefined;
}



const Posts: React.FC<Props> = ({ query }: Props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [deletePermission, setDeletePermission] = useState(true);

  // useEffect(() => {
  //   if (user?.username === "admin") {
  //   });



  console.log(user)

  const fetchPosts = useCallback(async (page: number): Promise<ApiResponse<Post[]>> => {
    try {
      const accessToken = await getAccessTokenSilently();
      // console.log("fetchPosts: ", page, "brrrr why is this so hard"); 
      return query? searchPosts(accessToken, query, page): getTopPosts(accessToken, page);
    } catch (error) {
      console.log("error fetching data: ", error);
      return { error: error as AppError, data: [] };
    }
  }, [query]);


  const handleDelete = () => {
    console.log("delete");


  };

  function renderPost({ item }: { item: Post }): JSX.Element {
    return (

      <div className="post" key={"post" + item.id}>
            <Link to={`/posts/${item.id}`}>
              <div className="post-title">
                <h2>{item.title}</h2>
              </div>
              <p>
                <span className="author">{item.author}:</span>{" "}
                {item.body.length > 280
                  ? item.body.slice(0, 280) + "..."
                  : item.body}
              </p>
            </Link>
            <div className="bottom-post" key={"bottom" + item.id}>
              <VoteButtons
                onVote={handleVote}
                id={item.id}
                likes={item.likes}
                activeVote={item.vote}
              />
              <div className="post-info" key = {"info" + item.id}>
                <ReactTimeAgo date={new Date(item.createdAt)} locale="en-US" />
                <div className="post-views">
                  {item.views}
                  <FontAwesomeIcon icon={faEye} />
                </div>
              </div>
              {
                deletePermission && (
                  <div className="delete-post">
                    <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
                  </div>
                )
              }
            </div>
          </div>
    );
  }
  

  const handleVote = async (id: number, vote: Vote) => {
    if (!user?.username) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.username, vote, "post");
  };

  return (
    <div>
      <InfiniteScroll<Post>
      fetchData={fetchPosts}
      renderItem={renderPost}
    />
    </div>
  );
};

export default Posts;
