import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import AuthContextProvider from "./UserContext";
import Main from "./Main";
import Question from "./Question";
import AuthButton from "./AuthButton";
// import {useAuth0} from "@auth0/auth0-react";
// import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
// import ProectedRoute from "./auth/procted-route";
const App = () => {
  const [data, setData] = useState("Nothing");

  // useEffect(() => {
  //   fetch("http://localhost:9000/react-test")
  //     .then((res) => res.text())
  //     .then((res) => setData(res));
  // }, []);
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    // <AuthContextProvider>
      <div>
          <AuthButton />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Auth />} /> */}
            {/* <ProtectedRoute path="/main" element={<Main />} />
            <ProtectedRoute path="/home" element={<Home />} />
            <ProtectedRoute path="/main/question/:id" element={<Question />} /> */}
          </Routes>
    {/* // </AuthContextProvider> */}
      </div>
  );
}

export default App;
