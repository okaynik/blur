
// import { VoteProps } from "../models/vote";
import { Vote } from "../models/vote";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
    const [activeUp, setActiveUp] = useState(false);
    const [activeDown, setActiveDown] = useState(false);
    const [displayLikes, setDisplayLikes] = useState(likes);
  
    useEffect(() => {
        if (activeVote === "up") {
          setActiveUp(true);
          setActiveDown(false);
        } else if (activeVote === "down") {
          setActiveUp(false);
          setActiveDown(true);
        } else {
          setActiveUp(false);
          setActiveDown(false);
        }
        setDisplayLikes(likes);
      }, [activeVote, likes]);

    return (
      <div className="vote-buttons">
        <button
          className={activeUp ? "upvote upvote-active" : "upvote"}
          onClick={() => { onVote(id, "up");}}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <h2>{displayLikes}</h2>
        <button
          className={activeDown ? "downvote downvote-active" : "downvote"}
          onClick={() => { onVote(id, "down");}}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    );
  };
  