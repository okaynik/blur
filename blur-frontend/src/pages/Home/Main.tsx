// import Navbar from "../../components/Navbar";
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
    <Layout>
      <Posts />
    </Layout>

  );
}
