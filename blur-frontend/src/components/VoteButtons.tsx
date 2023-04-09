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

  return (
    <div className="vote-buttons">
      <button
        className={activeUp ? "upvote upvote-active" : "upvote"}
        onClick={() => {
          onVote(id, "up");
          if (!activeUp) {
            setActiveUp(true);
            if (activeDown) {
              setActiveDown(false);
              setDisplayLikes(displayLikes + 2);
            } else {
              setDisplayLikes(displayLikes + 1);
            }
          } else {
            setActiveUp(false);
            setActiveDown(false);
            setDisplayLikes(displayLikes - 1);
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <h2>{displayLikes}</h2>
      <button
        className={activeDown ? "downvote downvote-active" : "downvote"}
        onClick={() => {
          onVote(id, "down");
          if (!activeDown) {
            setActiveDown(true);
            if (activeUp) {
              setActiveUp(false);
              setDisplayLikes(displayLikes - 2);
            } else {
              setDisplayLikes(displayLikes - 1);
            }
          } else {
            setActiveDown(false);
            setActiveUp(false);
            setDisplayLikes(displayLikes + 1);
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};
