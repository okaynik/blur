// import { VoteProps } from "../models/vote";
import { Vote } from "../models/vote";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/VoteButtons.css";
interface VoteProps {
  onVote: (id: number, vote: Vote) => void;
  id: number;
  likes: number;
  activeVote: Vote | null;
}

export const VoteButtons: React.FC<VoteProps> = ({
  onVote,
  id,
  likes,
  activeVote,
}: VoteProps) => {
  const [activeUp, setActiveUp] = useState(activeVote === "up" ? true : false);
  const [activeDown, setActiveDown] = useState(
    activeVote === "down" ? true : false
  );
  const [displayLikes, setDisplayLikes] = useState(likes);

  // useEffect(() => {
  //   if (activeVote === "up") {
  //     setActiveUp(true);
  //     setActiveDown(false);
  //   } else if (activeVote === "down") {
  //     setActiveUp(false);
  //     setActiveDown(true);
  //   } else {
  //     setActiveUp(false);
  //     setActiveDown(false);
  //   }
  //   setDisplayLikes(likes);
  // }, [activeVote, likes]);

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
