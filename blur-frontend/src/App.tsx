import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import Main from "./pages/Home/Main";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageLoader } from "./components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import UserPage from "./pages/User/UserPage";
import NewPost from "./pages/NewPost/NewPost";
import PostView from "./pages/Post/PostView";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  const handleAuth = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/main",
      },
      screen_hint: "login",
    });
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      handleAuth();
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/main" element={<ProtectedRoute component={Main} />} />
      <Route path="/" element={<Navigate to={"/main"} />} />
      <Route path="/fakeuserid" element={<UserPage />} />
      <Route path="/newpost" element={<NewPost />} />
      <Route path="/posts/:id" element={<PostView />} />
    </Routes>
  );
}

export default App;
