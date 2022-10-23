import { useState } from "react";
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

export default function Posts() {
  const [userList, setUserlist] = useState(posts.questions);

  return (
    <Box className="Questions-box">
      {userList?.length > 0 &&
        userList?.map((post) => {
          return (
            <Card variant="outlined" className="Card" key={post.id}>
              <Vote likes={post.likes} />
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {post.username}
                </Typography>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2">{post.ans}</Typography>
              </CardContent>
            </Card>
          );
        })}
    </Box>
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
