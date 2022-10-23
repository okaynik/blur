import { useEffect, useState } from "react";
import posts from "./mockPosts.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Posts.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Post } from "./Main";
import { Link } from "react-router-dom";

export default function Posts() {
  const [postList, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/posts/topviews")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <Box className="Questions-box">
      {postList?.length > 0 &&
        postList?.map((post) => {
          return (
            <Card
              variant="outlined"
              className="Outer-card"
              sx={{ background: "snow" }}
            >
              <Link
                to={`question/${post.id}`}
                key={post.id}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Card className="Inner-card" sx={{ background: "snow" }}>
                  <Vote likes={post.likes} />
                  <CardContent classes="Card-content" sx={{ p: 0 }}>
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
              </Link>
            </Card>
          );
        })}
    </Box>
  );
}

function Vote(props: { likes: number }) {
  const [offset, setOffset] = useState(0);
  const [colorUp, setColorUp] = useState("black");
  const [colorDown, setColorDown] = useState("black");
  return (
    <div className="Votes">
      <FaChevronUp
        size={"20"}
        color={colorUp}
        onClick={(e) => {
          e.preventDefault();
          setOffset(1);
          setColorUp("orange");
          setColorDown("black");
        }}
      />
      <p className="Likes fs-4">{props.likes + offset}</p>
      <FaChevronDown
        size={"20"}
        color={colorDown}
        onClick={(e) => {
          e.preventDefault();
          setOffset(-1);
          setColorDown("blue");
          setColorUp("black");
        }}
      />
    </div>
  );
}
