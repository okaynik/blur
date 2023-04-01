import Navbar from "../../components/Navbar";
import Posts from "./Posts";
import "../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getProtectedResource } from "../../services/message.service";
import Layout from "../Layout";

export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  likes: number;
  views: number;
  time: string;
}

export interface Response {
  id: number;
  body: string;
  author: string;
  likes: number;
  time: string;
  postId: number;
}

export default function Main() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<string>("");

  const { user, logout, isLoading, getAccessTokenSilently } = useAuth0();

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const submitPost = () => {
    fetch("http://localhost:9000/api/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "applicati   on/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        author: "spicyshrimp",
      }),
    });
    setIsEditing(false);
  };

  useEffect(() => {
    if (!user) {
      logout({ returnTo: window.location.origin });
    }
  }, [isLoading]);

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <Layout isEditing={isEditing} handleEdit={handleEdit}>
      <p>Hello {user?.nickname}</p>

      {isEditing && (
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
            <button className="btn btn-dark" onClick={submitPost}>
              Submit
            </button>
          </div>
        </div>
      )}
      {!isEditing && <Posts />}
    </Layout>

  );
}
