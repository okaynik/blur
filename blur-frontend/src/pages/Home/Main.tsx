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
  const { user, logout, isLoading } = useAuth0();

  useEffect(() => {
    if (!user) {
      logout({ returnTo: window.location.origin });
    }
  }, [isLoading]);

  return (
    <Layout>
      <Posts />
    </Layout>
  );
}
