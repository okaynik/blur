import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";
import Home from "./Home";
import AuthContextProvider from "./UserContext";
import Main from "./Main";
import Question from "./Question";

function App() {
  const [data, setData] = useState("Nothing");

  useEffect(() => {
    fetch("http://localhost:9000/react-test")
      .then((res) => res.text())
      .then((res) => setData(res));
  }, []);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/main" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main/question/:id" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
