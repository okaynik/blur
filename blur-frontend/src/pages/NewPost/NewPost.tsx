import { useState } from "react";
import Layout from "../Layout";
import "../../styles/NewPost.css";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../../services/posts.service";
import { useAuth0 } from "@auth0/auth0-react";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const submitPost = async () => {
    if (!title || !body) {
      alert("Please fill out all fields");
      return;
    }
    if (!user) {
      alert("Please log in to submit a post");
      return;
    }
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await createPost(
      accessToken,
      title,
      body,
      user.nickname as string
    );

    if (error) {
      alert("Error creating post, try again");
      return;
    }

    if (data) {
      navigate(`/posts/${data}`);
    }
  };

  return (
    <Layout>
      <div className="Create-box">
        <div className="Create form-group mt-3">
          <label>Your Question</label>
          <input
            type="username"
            className="form-control mt-1"
            placeholder="Enter question"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mt-1"
            placeholder="Enter description of your question"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="ButtonGroup">
          <Link className="btn btn-dark" to={"/main"}>
            Cancel
          </Link>
          <button className="btn btn-dark" onClick={submitPost}>
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
}
