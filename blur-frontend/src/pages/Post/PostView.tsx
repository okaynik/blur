import { useEffect, useState } from "react";
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

export default function PostView() {
  const { id } = useParams();
  const [showAddResponse, setShowAddResponse] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  const post = useMakeRequest<Post>(getPost, id as string);
  const [responses, setResponses] = useState<Response[]>([]);
  const value = useMakeRequest<Response[]>(getResponses, id as string);

  useEffect(() => {
    if (value) {
      setResponses(value);
    }
  }, [value]);

  const [answer, setAnswer] = useState("");
  const [update, setUpdate] = useState(false);

  const submitResponse = async () => {
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
      user.nickname as string,
      answer
    );

    if (error) {
      alert("Error creating response, try again");
      return;
    }
    setAnswer("");
    setUpdate(!update);
    setShowAddResponse(false);

    const { data, error: err } = await getResponses(accessToken, id as string);
    if (err) {
      alert("Error getting responses, try again");
    }
    if (data) {
      setResponses(data);
    }
  };

  const handleVotePost = async (id: number, vote: Vote) => {
    if (!user?.nickname) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.nickname, vote, "post");
  };

  const handleVoteResponse = async (id: number, vote: Vote) => {
    if (!user?.nickname) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.nickname, vote, "response");
    setUpdate(!update);
  };

  if (!post || !responses) {
    return <PageLoader />;
  }

  const renderTimeAgo = (createdAt:Date) => {
    // Convert createdAt to a Date object
    const date = new Date(createdAt);
  
    // Render ReactTimeAgo component with the correct locale
    return <ReactTimeAgo date={date} locale="en-US" />;
  };

  return (
    <Layout>
      <div className="container">
        <div className="post-view">
          <h1>{post?.title}</h1>
          <div className="post-details">
            <p className="post-author"> {post?.author}</p>
            <p className="post-body">{post?.body}</p>
          </div>

          <div className="bottom-post">
            <div className="post-buttons">
              <button
                onClick={() => setShowAddResponse(!showAddResponse)}
                className="add-response-button"
              >
                {showAddResponse ? "Cancel" : "Add a response"}
              </button>
              <VoteButtons
                onVote={handleVotePost}
                id={post.id}
                likes={post.likes}
                activeVote={post.vote}
              />
            </div>
            <div className="post-info">
              <ReactTimeAgo
                date={post.createdAt}
                locale="en-US"
                future={true}
              />
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
          {responses?.map((response) => (
            <div key={response.id} className="response">
              <div className="response-details">
                <p className="response-author"> {response.author}</p>
                <p className="response-body">{response.body}</p>
              </div>
              <div className="response-meta bottom-post">
                <VoteButtons
                  onVote={handleVoteResponse}
                  id={response.id}
                  likes={response.likes}
                  activeVote={response.vote}
                />
                <ReactTimeAgo date={post.createdAt} locale="en-US" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
