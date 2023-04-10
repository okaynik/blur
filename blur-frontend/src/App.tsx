import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Main from "./pages/Home/Main";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageLoader } from "./components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import UserPage from "./pages/User/UserPage";
import NewPost from "./pages/NewPost/NewPost";
import PostView from "./pages/Post/PostView";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Verify from "./pages/Auth/Verify";

TimeAgo.addDefaultLocale(en);

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();

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

  if (!user?.email_verified) {
    return <ProtectedRoute component={Verify} />;
  }

  return (
    <Routes>
      <Route
        path="/main/:query?"
        element={<ProtectedRoute component={Main} />}
      />
      <Route path="/" element={<ProtectedRoute component={Main} />} />
      <Route path="/user" element={<ProtectedRoute component={UserPage} />} />
      <Route path="/newpost" element={<ProtectedRoute component={NewPost} />} />
      <Route
        path="/posts/:id"
        element={<ProtectedRoute component={PostView} />}
      />
    </Routes>
  );
}

export default App;
