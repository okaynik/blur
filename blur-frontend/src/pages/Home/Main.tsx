import Posts from "./Posts";
import "../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "../Layout";
import { useParams } from "react-router-dom";

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
  const { user, logout, isLoading } = useAuth0();
  const { query } = useParams();

  useEffect(() => {
    if (!user) {
      logout({ returnTo: window.location.origin });
    }
  }, [isLoading]);

  return (
    <Layout>
      <Posts query={query} />
    </Layout>
  );
}
