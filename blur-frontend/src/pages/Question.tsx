import { useEffect, useState } from "react";
// import responses from "./mockResponses.json";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Question.css";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { FaChevronUp, FaChevronDown } from "react-icons/fa";
// import TopBar from "../components/TopBar";
// import { useParams } from "react-router-dom";
// import { Response, Post } from "./Main";

// export default function Question() {
//   const [responseList, setResponses] = useState<Response[]>([]);
//   const [answer, setAnswer] = useState("");
//   // const [post, setPost] = useState<Post>({
//   //   id: 0,
//   //   title: "How can I drill on things like Dr. Charlesworth does?",
//   //   body: "really need help understanding programming languages but i don't know where to start",
//   //   author: "John",
//   //   likes: 12,
//   //   views: 120,
//   //   time: "2021-10-10 12:00:00",
//   // });
//   const [post, setPost] = useState<Post>();
//   const { id } = useParams();
//   const [update, setUpdate] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:9000/api/posts/getone/" + id)
//       .then((response) => response.json())
//       .then((data) => setPost(data.post));

//     fetch("http://localhost:9000/api/res/getall/" + id)
//       .then((response) => response.json())
//       .then((data) => setResponses(data.responses));
//   }, [update]);

//   const submitAnswer = () => {
//     fetch("http://localhost:9000/api/res/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         author: "spicyshrimp",
//         body: answer,
//         postId: id,
//       }),
//     });
//     setAnswer("");
//     setUpdate(!update);
//   };

//   return (
//     <>
//       <TopBar />

//       {post && (
//         <Box className="Post-box">
//           <Card variant="outlined" className="Post-Card">
//             <Vote likes={post.likes} />
//             <CardContent className="p-1">
//               <Typography variant="h5" component="div">
//                 {post.title}
//               </Typography>
//               <Typography
//                 sx={{ fontSize: 14 }}
//                 color="text.secondary"
//                 gutterBottom
//               >
//                 {post.author}
//               </Typography>
//               <Typography variant="body2">{post.body}</Typography>
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       <Box className="Answer">
//         <input
//           type="text"
//           className="Inp form-control mt-1"
//           placeholder="Enter your response here"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//         />
//         <div className="ButtonGroup">
//           <button
//             className="btn btn-dark mr-1"
//             style={{ marginRight: "5px" }}
//             onClick={() => setAnswer("")}
//           >
//             <span>Cancel</span>
//           </button>
//           <button className="btn btn-dark ml-1" onClick={submitAnswer}>
//             <span>Submit</span>
//           </button>
//         </div>
//       </Box>

//       {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         {responseList.length} Responses
//       </Typography> */}
//       <div className="Header mt-3 ml-2">
//         <h4>{responseList.length} Responses:</h4>
//       </div>
//       <Box className="Questions-box">
//         {responseList?.length > 0 &&
//           responseList?.map((response) => {
//             return (
//               <Card variant="outlined" className="Card" key={response.id}>
//                 <Vote likes={response.likes} />
//                 <CardContent>
//                   <Typography
//                     sx={{ fontSize: 14 }}
//                     color="text.secondary"
//                     gutterBottom
//                   >
//                     {response.author}
//                   </Typography>
//                   <Typography variant="body2">{response.body}</Typography>
//                 </CardContent>
//               </Card>
//             );
//           })}
//       </Box>
//     </>
//   );
// }

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
