import { useEffect, useState } from "react";
import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { VoteButtons } from "./VoteButtons";
import { Vote } from "../models/vote";
import ReactTimeAgo from "react-time-ago";
import { Comment } from "../models/comment";
import { createComment, getComments } from "../services/posts.service";

interface Props {
  responseId: number;
  author: string;
  body: string;
  createdAt: string;
  likes: number;
  vote: Vote | null;
  numComments: number;
  comments: any[];
  onVote: (id: number, vote: Vote) => void;
}

export function ResponseView({
  responseId,
  author,
  body,
  createdAt,
  likes,
  vote,
  onVote,
  numComments,
  comments,
}: Props) {
  const [showAddComment, setshowAddComment] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const { user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [commentsDisplay, setComments] = useState<Comment[]>(comments);
  const [numberOfComments, setNumberOfComments] = useState(numComments);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleAuth = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/main",
      },
      screen_hint: "login",
    });
  };
  const submitComment = async () => {
    if (commentBody === "") {
      alert("Please fill out all fields");
      return;
    }
    if (!user) {
      alert("Please log in to submit a post");
      return;
    }

    const accessToken = await getAccessTokenSilently();
    const { data: _, error } = await createComment(
      accessToken,
      responseId.toString(),
      user.username as string,
      commentBody
    );

    if (error) {
      alert("Error creating the comment:\n" + error.message);
      return;
    }
    setCommentBody("");
    setshowAddComment(false);

    const { data, error: err } = await getComments(
      accessToken,
      responseId.toString()
    );
    if (err) {
      alert("Error getting comments, try again");
    }
    if (data) {
      setComments(data);
      setNumberOfComments(data.length);
      setShowAllComments(true);
    }
  };

  const viewAllComments = async () => {
    let accessToken = "";
    if (user) {
      accessToken = await getAccessTokenSilently();
    }
    const { data, error } = await getComments(
      accessToken,
      responseId.toString()
    );
    if (error) {
      alert("Error getting responses, try again");
    }
    if (data) {
      setComments(data);
      setNumberOfComments(data.length);
      setShowAllComments(true);
    }
  };

  return (
    <>
      <div
        key={responseId}
        className={`response ${
          numberOfComments > 0 ? "no-bottom-padding" : ""
        }`}
      >
        <div className="response-details">
          <p className="response-author"> {author}</p>
          <p className="response-body">{body}</p>
        </div>
        <div className="response-meta bottom-post">
          <div className="response-buttons">
            <VoteButtons
              onVote={onVote}
              id={responseId}
              likes={likes}
              activeVote={vote}
            />
            <a
              onClick={() => {
                if (!user) {
                  alert("Please log in to leave a comment");
                  handleAuth();
                  return;
                }
                setshowAddComment(!showAddComment);
              }}
              className="add-comment"
            >
              {showAddComment ? "Cancel" : "Add a comment"}
            </a>
          </div>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </div>
        {showAddComment && (
          <div className="input-area">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              onFocus={(e) => (e.target.style.outline = "none")}
              onBlur={(e) => (e.target.style.outline = "")}
              placeholder="Add a comment..."
              maxLength={255}
            ></textarea>
            <div className="input-area-buttons">
              <button onClick={() => setshowAddComment(false)}>Cancel</button>
              <button onClick={submitComment}>Submit</button>
            </div>
          </div>
        )}
        {commentsDisplay.length > 0 && (
          <div className="comments">
            <div className="comments-list">
              {commentsDisplay.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-details">
                    <p className="comment-author"> {comment.username}</p>
                    <ReactTimeAgo
                      date={new Date(comment.createdAt)}
                      locale="en-US"
                    />
                  </div>
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))}
            </div>
            {!showAllComments && numberOfComments > 2 && (
              <a className="view-all-comments" onClick={viewAllComments}>
                View all {numberOfComments} comments
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}
