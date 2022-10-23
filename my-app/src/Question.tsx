import { useEffect, useState } from "react";
import responses from "./mockResponses.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Post, Response } from "./Main";
import TopBar from "./TopBar";
import { useParams } from "react-router-dom";

export default function Question() {
  const [responseList, setResponses] = useState(responses.responses);
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "How can I drill on things like Dr. Charlesworth does?",
    body: "really need help understanding programming languages but i don't know where to start",
    author: "John",
    likes: 12,
    views: 120,
    time: "2021-10-10 12:00:00",
  });
  const { id } = useParams();

  // useEffect(() => {
  //   fetch("http://localhost:9000/api/posts/" + id)
  //     .then((response) => response.json())
  //     .then((data) => setPost(data.post));
  // }, []);

  return (
    <>
      <TopBar />

      {post && (
        <Box className="Post-box">
          <Card variant="outlined" className="Post-Card">
            <Vote likes={post.likes} />
            <CardContent className="p-0">
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {post.author}
              </Typography>
              <Typography variant="body2">{post.body}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box className="Questions-box">Enter your answer here</Box>

      <Box className="Questions-box">
        {responseList?.length > 0 &&
          responseList?.map((response) => {
            return (
              <Card variant="outlined" className="Card" key={response.id}>
                <Vote likes={response.likes} />
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {response.username}
                  </Typography>
                  <Typography variant="body2">{response.ans}</Typography>
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </>
  );
}

function Vote(props: { likes: number }) {
  return (
    <div className="Votes">
      <FaChevronUp size={"20"} />
      <p className="Likes fs-4">{props.likes}</p>
      <FaChevronDown size={"20"} />
    </div>
  );
}
