import { useEffect, useState } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../models/post";
import { Response } from "../../models/response";
import Layout from "../Layout";
import { getPost, getResponses } from "../../services/posts.service";
import { useMakeRequest } from "../../services/useMakeRequest";

export default function PostView() {
  const [answer, setAnswer] = useState("");
  const { id } = useParams();
  const post = useMakeRequest<Post>(getPost, id as string);
  const responses = useMakeRequest<Response[]>(getResponses, id as string);
  const [update, setUpdate] = useState(false);

  const submitAnswer = () => {
    fetch("http://localhost:9000/api/res/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: "spicyshrimp",
        body: answer,
        postId: id,
      }),
    });
    setAnswer("");
    setUpdate(!update);
  };

  return (
    <Layout>
      <h1>{post?.title}</h1>
      <br />
      {post?.author}
      <br />
      {post?.body}
      <br />
      <h1>Responses</h1>
      {responses?.map((response) => (
        <div key={response.id}>
          {response.author}
          <br />
          {response.body}
          <br />
        </div>
      ))}
    </Layout>
  );
}

// function Vote(props: { likes: number }) {
//   const [offset, setOffset] = useState(0);
//   const [colorUp, setColorUp] = useState("black");
//   const [colorDown, setColorDown] = useState("black");
//   return (
//     <div className="Votes">
//       <FaChevronUp
//         size={"20"}
//         color={colorUp}
//         onClick={(e) => {
//           e.preventDefault();
//           setOffset(1);
//           setColorUp("orange");
//           setColorDown("black");
//         }}
//       />
//       <p className="Likes fs-4">{props.likes + offset}</p>
//       <FaChevronDown
//         size={"20"}
//         color={colorDown}
//         onClick={(e) => {
//           e.preventDefault();
//           setOffset(-1);
//           setColorDown("blue");
//           setColorUp("black");
//         }}
//       />
//     </div>
//   );
// }
