import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import Main from "./pages/Home/Main";
// import Question from "./pages/Question";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageLoader } from "./components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import UserPage from "./pages/User/UserPage";
import NewPost from "./pages/NewPost/NewPost";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, buildAuthorizeUrl } =
    useAuth0();
  // const [authUrl, setAuthUrl] = useState("");

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
    // const getUrl = async () => {
    //   const url = await buildAuthorizeUrl({
    //     prompt: "login",
    //     appState: {
    //       returnTo: "/profile",
    //     },
    //     screen_hint: "signup",
    //   });
    //   setAuthUrl(url);
    // };
    // getUrl();

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
      <Route path="/fakeuserid" element={<UserPage username='fakeuser'/>} />
      <Route path="/newpost" element={<NewPost />} />

      {/* <Route path="/" element={<Auth />} /> */}
      {/* <Route path="/main/question/:id" element={<Question />} /> */}
    </Routes>
  );
}

export default App;
