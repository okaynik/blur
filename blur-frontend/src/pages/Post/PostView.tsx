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
import { ResponseView } from "../../components/ResponseView";

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
      user.username as string,
      answer
    );

    if (error) {
      alert("Error creating response, try again");
      return;
    }
    setAnswer("");
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
    if (!user?.username) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.username, vote, "post");
  };

  const handleVoteResponse = async (id: number, vote: Vote) => {
    if (!user?.username) {
      alert("Please log in to upvote a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    await likePost(accessToken, id.toString(), user.username, vote, "response");
  };

  if (!post || !responses) {
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
                onClick={() => setShowAddResponse(!showAddResponse)}
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
          {responses?.map((response) => (
            <ResponseView
              key={response.id}
              responseId={response.id}
              author={response.author}
              body={response.body}
              createdAt={response.createdAt}
              likes={response.likes}
              vote={response.vote}
              comments={response.comments}
              numComments={response.numComments}
              onVote={handleVoteResponse}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
