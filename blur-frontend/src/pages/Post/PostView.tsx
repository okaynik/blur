import { useState, useCallback } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../models/post";
import { Response } from "../../models/response";
import Layout from "../Layout";
import {
  createResponse,
  getPost,
  getResponses,
  likePost,
} from "../../services/posts.service";
import { useMakeRequest } from "../../services/useMakeRequest";
import "../../styles/PostView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../../components/PageLoader";
import { VoteButtons } from "../../components/VoteButtons";
import { Vote } from "../../models/vote";
import ReactTimeAgo from "react-time-ago";
import { ResponseView } from "../../components/ResponseView";
import { AppError } from "../../models/app-error";

import { ApiResponse } from "../../models/api-response";
import InfiniteScroll from "../../components/InfiniteScroll";

export default function PostView() {
  const { id } = useParams();
  const [showAddResponse, setShowAddResponse] = useState(false);
  const { user, getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const post = useMakeRequest<Post>(getPost, id as string);
  const [responsesUpdated, setResponsesUpdated] = useState(0);

  const [answer, setAnswer] = useState("");

  const handleAuth = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/main",
      },
      screen_hint: "login",
    });
  };
  const submitResponse = async () => {
    setResponsesUpdated(responsesUpdated + 1);
    if (answer === "") {
      alert("Please fill out all fields");
      return;
    }
    if (!user) {
      alert("Please log in to submit a post");
      return;
    }

    const accessToken = await getAccessTokenSilently();
    const { data: _, error } = await createResponse(
      accessToken,
      id as string,
      user.username as string,
      answer
    );

    if (error) {
      alert("Error creating response:\n" + error.message);
      return;
    }
    setAnswer("");
    setShowAddResponse(false);
    
  };

  const handleVotePost = async (id: number, vote: Vote) => {
    if (!user?.username) {
      alert("Please log in to upvote a post");
      handleAuth();
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.username, vote, "post");
  };

  const handleVoteResponse = async (id: number, vote: Vote) => {
    if (!user?.username) {
      alert("Please log in to upvote a post");
      handleAuth();
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.username, vote, "response");
  };

  const fetchResponses = useCallback(
    async (page: number): Promise<ApiResponse<Response[]>> => {
      try {
        let accessToken = "";
        if (user) {
          accessToken = await getAccessTokenSilently();
        }
        return getResponses(accessToken, id as string, page);
      } catch (error) {
        console.log("error fetching data: ", error);
        return { error: error as AppError, data: [] };
      }
    },
    [responsesUpdated]
  );

  function renderResponse({ item }: { item: Response }): JSX.Element {
    return (
      <ResponseView
        key={item.id}
        responseId={item.id}
        author={item.author}
        body={item.body}
        createdAt={item.createdAt}
        likes={item.likes}
        vote={item.vote}
        comments={item.comments}
        numComments={item.numComments}
        onVote={handleVoteResponse}
      />
    );
  }

  if (!post) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <div className="container">
        <div className="post-view">
          <div className="post-details">
            <h1>{post?.title}</h1>
            <h4 className="post-author"> {post?.author}</h4>
          </div>
          <p className="post-body">{post?.body}</p>

          <div className="bottom-post">
            <div className="post-buttons">
              <VoteButtons
                onVote={handleVotePost}
                id={post.id}
                likes={post.likes}
                activeVote={post.vote}
              />
              <button
                onClick={() => {
                  if (!user) {
                    alert("Please log in to leave a response");
                    handleAuth();
                    return;
                  }
                  setShowAddResponse(!showAddResponse);
                }}
                className="add-response-button"
              >
                {showAddResponse ? "Cancel" : "Add a response"}
              </button>
            </div>
            <div className="post-info">
              <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
              <div className="post-views">
                {post.views}
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
          </div>
        </div>

        <div className="add-response">
          {showAddResponse && (
            <>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onFocus={(e) => (e.target.style.outline = "none")}
                onBlur={(e) => (e.target.style.outline = "")}
                placeholder="Add a response"
                maxLength={2000}
              ></textarea>
              <div className="response-button-group">
                <button onClick={() => setShowAddResponse(false)}>
                  Cancel
                </button>
                <button onClick={submitResponse}>Submit</button>
              </div>
            </>
          )}
        </div>
        <div className="responses">
          <h3>Responses</h3>

          <InfiniteScroll<Response>
            fetchData={fetchResponses}
            renderItem={renderResponse}
            responsesUpdated={responsesUpdated}
          />

        </div>
      </div>
    </Layout>
  );
}
